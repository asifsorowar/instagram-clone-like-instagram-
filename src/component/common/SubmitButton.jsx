import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const SubmitButton = ({ label, ...otherProps }) => {
  const { isValid, handleSubmit } = useFormikContext();
  return (
    <Button
      type="submit"
      disabled={!isValid}
      onClick={handleSubmit}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
