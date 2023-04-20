declare namespace UserNamespace {
  interface UserDataState {
    uid?: string;
    email?: string | null;
    admin?: boolean;
  }

  interface UserContext {
    userData: UserDataState;
    isUserAuthenticated: () => boolean;
    addUserData: (userData: UserDataState) => void;
    removeUserData: () => void;
  }
}
