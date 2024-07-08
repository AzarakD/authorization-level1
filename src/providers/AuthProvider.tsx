import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ID } from "appwrite";

import { account } from "../services/appwrite";
import type { IAuthContext, IUser } from "./AuthProvider.type";

export const AuthContext = createContext<IAuthContext>({
  user: null,
  authUser: async () => {},
  logoutUser: async () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const authUser = async (
    email: string,
    password: string,
    isRegister = false
  ) => {
    try {
      setIsLoading(true);

      if (isRegister) {
        await account.create(ID.unique(), email, password);
      }

      await account.createEmailPasswordSession(email, password);
      setUser(await account.get());

      // redirect to homepage
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      setUser(await account.get());
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);
    await account.deleteSession("current");
    setUser(null);
    setIsLoading(false);
  };

  const contextData: IAuthContext = {
    user,
    authUser,
    logoutUser,
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};
