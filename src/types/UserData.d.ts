declare namespace UserNamespace {
  interface UserDataState {
    uid?: string;
    email?: string | null;
    refreshToken?: string;
    admin?: boolean;
  }

  interface UserContext {
    userData: UserDataState;
    isUserAuthenticated: () => boolean;
    addUserData: (userData: UserData) => void;
    removeUserData: () => void;
  }
}
