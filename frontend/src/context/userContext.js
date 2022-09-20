import React, { createContext, useReducer } from "react";
import * as AuthTypes from "../types/auth";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AuthTypes.AUTH_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("is_admin", payload.is_admin);
      return {
        isLogin: true,
        user: payload,
      };
    case AuthTypes.AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("is_admin");
      return {
        isLogin: false,
        user: {},
      };
    case AuthTypes.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("is_admin");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
