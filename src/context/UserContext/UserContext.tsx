import React, { useReducer, Reducer } from "react";
import { auth } from "@/firebase";

enum UserContextActions {
  ADD_USER_DATA = "ADD_USER_DATA",
  REMOVE_USER_DATA = "REMOVE_USER_DATA",
}

interface ReducerAction {
  type: UserContextActions;
  payload?: UserNamespace.UserDataState;
}
/**
 * @info Reducer to Handle Actions
 */
const reducer: Reducer<UserNamespace.UserDataState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case UserContextActions.ADD_USER_DATA:
      return {
        uid: action?.payload?.uid,
        refreshToken: action?.payload?.refreshToken,
        email: action?.payload?.email,
        admin: action?.payload?.admin,
      };
    case UserContextActions.REMOVE_USER_DATA:
      return {
        uid: undefined,
        refreshToken: undefined,
        email: undefined,
        admin: undefined,
      };
    default:
      return state;
  }
};

export const UserContext = React.createContext<UserNamespace.UserContext>({
  userData: {},
  isUserAuthenticated: function (): boolean {
    throw new Error("Function not implemented.");
  },
  addUserData: function (userData: UserNamespace.UserDataState): void {
    throw new Error("Function not implemented.");
  },
  removeUserData: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    uid: auth?.currentUser?.uid,
    refreshToken: auth?.currentUser?.refreshToken,
    email: auth?.currentUser?.email,
    admin: auth?.currentUser?.email?.includes("dudekigor"),
  });

  console.log(state);

  const value: UserNamespace.UserContext = {
    userData: state,
    isUserAuthenticated: () => {
      return !!state?.uid;
    },

    addUserData: (userData) => {
      dispatch({
        type: UserContextActions.ADD_USER_DATA,
        payload: userData,
      });
    },

    removeUserData: () => {
      return dispatch({ type: UserContextActions.REMOVE_USER_DATA });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
