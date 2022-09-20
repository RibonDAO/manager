import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getAuth, signOut, User } from "firebase/auth";
import userManagerApi from "services/api/userManagerApi";
import firebaseApp from "services/firebase";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "utils/decodedToken";

export interface IAuthenticationContext {
  signInManagerWithGoogle: (response: any) => void;
  isAuthorized: (email: string) => boolean;
  user: User | undefined;
  setUser: (user: User) => void;
  allowed: boolean;
  logout: () => void;
  accessToken: string | null;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const firebaseAuth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  function isAuthorized(email: string) {
    if (!email) return false;
    return email.includes("@ribon.io");
  }

  const allowed = useMemo(() => isAuthorized(user?.email ?? ""), [user]);

  async function signInManagerWithGoogle(response: any) {
    try {
      if (isAuthorized(response.profileObj.email ?? "")) {
        const userManagerResponse = await userManagerApi.postUserManager(
          { idToken: response.tokenId },
          {
            headers: {
              Authorization: `Bearer ${response.accessToken}`,
              "Content-Type": "application/json",
              access_token: `${response.accessToken}`,
            },
          },
        );

        const token = await userManagerResponse.headers["access-token"];

        localStorage.setItem("token", token);

        navigate("dashboard");
      } else {
        navigate("/", { state: { incorrectDomain: true } });
      }
    } catch (error) {
      navigate("/", { state: { error } });
    }
  }

  function logout() {
    signOut(firebaseAuth)
      .then(() => {
        localStorage.removeItem("token");
        setUser(undefined);
      })
      .catch(() => {})
      .finally(() => {
        navigate("/");
      });
  }

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (!accessToken || !isAuthorized(decodeJwt(accessToken)?.email ?? "")) {
      logout();
    }
  }, [user]);

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      user,
      setUser,
      allowed,
      isAuthorized,
      logout,
      accessToken,
      signInManagerWithGoogle,
    }),
    [user, allowed],
  );

  return (
    <AuthenticationContext.Provider value={authenticationObject}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }

  return context;
};
