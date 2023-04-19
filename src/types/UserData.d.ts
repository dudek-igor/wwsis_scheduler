declare namespace UserNamespace {
  interface UserData {
    uid?: string;
    email?: string | null;
    refreshToken?: string;
    admin?: boolean;
  }

  interface UserContext {
    userData: UserData;
    isUserAuthenticated?: () => boolean;
    addUserData: (userData: UserData) => void;
    removeUserData?: () => void;
  }
}
