import React from "react";
import Modal from "@material-ui/core/Modal";
import AppForm from "./common/AppForm";
import Input from "./common/Input";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import SubmitButton from "./common/SubmitButton";
import { auth } from "../firebase";
import useModal from "./context/useModal";
import "./signUpModal.css";

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
  username: Yup.string().required().label("Username"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const handleSubmit = (setSignupOpen) => async (
  { username, email, password },
  { setErrors, resetForm }
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    user.updateProfile({ displayName: username });
    resetForm("");
    setSignupOpen(false);
  } catch (error) {
    setErrors({ password: error.message });
  }
};

const SignUpModal = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { signupOpen, setSignupOpen } = useModal();

  return (
    <Modal open={signupOpen} onClose={() => setSignupOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
        <AppForm
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit(setSignupOpen)}
          validationSchema={validateSchema}
        >
          <form className="signUp__form">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            <Input name="username" label="Username" color="primary" />
            <Input name="email" label="Email" color="primary" />
            <Input
              name="password"
              label="Password"
              color="primary"
              type="password"
            />
            <SubmitButton
              label="SignUp"
              color="primary"
              className="submitButton"
            />
          </form>
        </AppForm>
      </div>
    </Modal>
  );
};

export default SignUpModal;
