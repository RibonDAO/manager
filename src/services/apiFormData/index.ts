import Axios, { AxiosRequestConfig } from "axios";
import camelCaseKeys from "camelcase-keys";
import { normalizedLanguage } from "lib/currentLanguage";
import snakeCaseKeys from "snakecase-keys";
import { REFRESH_TOKEN_KEY, RIBON_API, TOKEN_KEY } from "utils/constants";
import userManagerApi from "services/api/userManagerApi";
import { getCookiesItem, setCookiesItem } from "lib/cookies";

export const baseURL = RIBON_API;
export const API_SCOPE = "/managers/v1";

const apiFormData = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

apiFormData.interceptors.request.use((request) =>
  request?.data
    ? { ...request, data: snakeCaseKeys(request?.data, { deep: true }) }
    : request,
);

async function requestNewToken() {
  try {
    const refreshToken = getCookiesItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    const res = await userManagerApi.postRefreshToken(refreshToken);
    const newToken = res.headers["access-token"];
    const newRefreshToken = res.headers["refresh-token"];

    setCookiesItem(TOKEN_KEY, newToken);
    setCookiesItem(REFRESH_TOKEN_KEY, newRefreshToken);

    return newToken;
  } catch (err) {
    return null;
  }
}
apiFormData.interceptors.response.use(
  (response) => ({
    ...response,
    data: camelCaseKeys(response.data, { deep: true }),
  }),
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 403 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      const newToken = await requestNewToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiFormData(originalRequest);
    }
    return Promise.reject(error);
  },
);

apiFormData.interceptors.request.use((config) => {
  const lang = normalizedLanguage();
  const authHeaders = {
    Language: lang,
    Authorization: `Bearer ${getCookiesItem(TOKEN_KEY)}`,
  };
  // eslint-disable-next-line no-param-reassign
  config.headers = { ...authHeaders, ...config.headers };

  return config;
});

export function apiFormDataPost(url: string, data: any, config?: AxiosRequestConfig) {
  if (config) return apiFormData.post(`${API_SCOPE}/${url}`, data, config);

  return apiFormData.post(`${API_SCOPE}/${url}`, data);
}

export default apiFormData;
