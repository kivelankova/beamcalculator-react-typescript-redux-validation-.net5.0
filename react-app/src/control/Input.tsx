import React, { MouseEventHandler } from "react";
import { TextField } from "@material-ui/core";

type Props = {
  type?: string;
  name: string;
  label: string;
  value: number;
  variant?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  other?: any;
};

export default function Input(props: Props) {
  const {
    name,
    label,
    value,
    variant,
    onChange,
    error = null,
    ...other
  } = props;
  return (
    <TextField
      variant={variant || "outlined"}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
