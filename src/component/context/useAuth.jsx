import React, { useContext } from "react";
import AuthContext from "./authContext";
import { auth } from "../../firebase";

export default () => {
  const { user } = useContext(AuthContext);

  const authSingOut = () => {
    auth.signOut();
    window.location.reload();
  };

  return { user, authSingOut };
};
