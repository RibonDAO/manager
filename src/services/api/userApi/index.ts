import { AxiosResponse } from "axios";
import { User } from "@ribon.io/shared/types";
import { apiPost } from "..";

const usersApi = {
  postCreateUser: (email: string): Promise<AxiosResponse<User>> =>
    apiPost("users", { email }),

  postSearchUser: (email: string): Promise<AxiosResponse<User>> =>
    apiPost("users/search", { email }),
};

export default usersApi;
