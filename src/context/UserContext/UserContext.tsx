import React from "react";
import { auth } from "@/firebase";

enum UserContextActions {
  ADD_USER_DATA = "ADD_USER_DATA",
  REMOVE_USER_DATA = "REMOVE_USER_DATA",
  IS_USER_AUTHENTICATED = "IS_USER_AUTHENTICATED",
}

//Initial State and Actions
const initialState = {
  userData: {
    uid: auth?.currentUser?.uid,
    refreshToken: auth?.currentUser?.refreshToken,
    email: auth?.currentUser?.email,
    admin: auth?.currentUser?.email?.includes("dudekigor"),
  },
  addUserData: () => null,
};

interface ReducerAction {
  type: UserContextActions;
  payload?: UserNamespace.UserData;
}
/**
 * @info Reducer to Handle Actions
 */
const reducer = (state: any, action: ReducerAction) => {
  console.log({ state });

  switch (action.type) {
    case UserContextActions.ADD_USER_DATA:
      return action.payload;
    case UserContextActions.REMOVE_USER_DATA:
      return {};
    case UserContextActions.IS_USER_AUTHENTICATED:
      return !!state?.userData?.uid;
    default:
      return state;
  }
};
/**
 * @info Context and Provider
 */
export const UserContext =
  React.createContext<UserNamespace.UserContext>(initialState);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value: UserNamespace.UserContext = {
    ...state,
    isUserAuthenticated: () => {
      return dispatch({ type: UserContextActions.IS_USER_AUTHENTICATED });
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
