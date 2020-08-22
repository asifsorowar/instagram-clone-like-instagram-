import React from "react";
import { Button } from "@material-ui/core";
import useAuth from "./context/useAuth";
import useModal from "./context/useModal";

const Navigation = () => {
  const { user, authSingOut } = useAuth();
  const { setLoginOpen, setSignupOpen } = useModal();

  return (
    <div className="app__header">
      <img
        className="app__headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />
      {user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "20%",
          }}
        >
          <a href="#upload">UPLOAD</a>
          <Button onClick={authSingOut} color="secondary">
            logout
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => setSignupOpen(true)}>SignUp</Button>
          <Button
            onClick={() => setLoginOpen(true)}
            color="primary"
            variant="outlined"
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
