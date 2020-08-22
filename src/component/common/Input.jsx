import React from "react";
import { TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

const Input = ({ name, fullWidth = true, ...otherProps }) => {
  const {
    handleChange,
    values,
    errors,
    setFieldTouched,
    touched,
  } = useFormikContext();

  const isError = (error, visible) => {
    if (!visible || !error) return false;
    return true;
  };

  return (
    <TextField
      name={name}
      onBlur={() => setFieldTouched(name)}
      onChange={handleChange(name)}
      value={values[name]}
      error={isError(errors[name], touched[name])}
      helperText={errors[name]}
      fullWidth={fullWidth}
      {...otherProps}
    />
  );
};

export default Input;
