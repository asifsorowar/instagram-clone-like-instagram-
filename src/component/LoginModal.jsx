import React from "react";
import Modal from "@material-ui/core/Modal";
import AppForm from "./common/AppForm";
import Input from "./common/Input";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import SubmitButton from "./common/SubmitButton";
import { auth } from "../firebase";
import useModal from "./context/useModal";
import "./loginModal.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

let validateSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const handleSubmit = (setLoginOpen) => async (
  { email, password },
  { setErrors, resetForm }
) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    resetForm("");
    setLoginOpen(false);
  } catch (error) {
    setErrors({ password: error.message });
  }
};

const LoginModal = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { loginOpen, setLoginOpen } = useModal();

  return (
    <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit(setLoginOpen)}
          validationSchema={validateSchema}
        >
          <form className="login__form">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            <Input name="email" label="Email" color="primary" />
            <Input
              name="password"
              label="Password"
              color="primary"
              type="password"
            />
            <SubmitButton
              label="login"
              color="primary"
              className="submitButton"
            />
          </form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default LoginModal;
