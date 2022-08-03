import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  User,
} from "firebase/auth";
import firebaseApp from "services/firebase";
import { useNavigate } from "react-router-dom";
import useUsers from "hooks/apiHooks/useUsers";
import { decodeJwt } from "utils/decodedToken";

export interface IAuthenticationContext {
  signInWithGoogle: () => void;
  isAuthorized: (email: string) => boolean;
  user: User | undefined;
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
  const { findOrCreateUser } = useUsers();
  const [user, setUser] = useState<User>();

  function isAuthorized(email: string) {
    if (!email) return false;
    return email.includes("@ribon.io");
  }

  const allowed = useMemo(() => isAuthorized(user?.email ?? ""), [user]);

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        if (isAuthorized(result.user.email ?? "")) {
          const currentUser = await findOrCreateUser(result.user.email ?? "");
          if (currentUser) {
            setUser(result.user);
          }
          const token = await result.user.getIdToken();
          localStorage.setItem("token", token);
          navigate("dashboard");
        } else {
          navigate("/", { state: { incorrectDomain: true } });
        }
      })
      .catch((error) => {
        navigate("/", { state: { error } });
      });
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
      signInWithGoogle,
      user,
      allowed,
      isAuthorized,
      logout,
      accessToken,
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
