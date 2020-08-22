import React, { useContext } from "react";
import ModalContext from "./modalContext";

export default () => {
  const { signupOpen, setSignupOpen, loginOpen, setLoginOpen } = useContext(
    ModalContext
  );

  return { signupOpen, setSignupOpen, loginOpen, setLoginOpen };
};
