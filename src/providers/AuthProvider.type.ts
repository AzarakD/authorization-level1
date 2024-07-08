export interface IUser {
  email: string;
  name: string;
  $id: string;
}

export interface IAuthContext {
  user: IUser | null;
  authUser: (
    email: string,
    password: string,
    isRegister: boolean
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
}
