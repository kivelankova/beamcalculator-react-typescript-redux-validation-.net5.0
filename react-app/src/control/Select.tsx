import React, { ChangeEvent, ReactNode } from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

type Props = {
  name: string;
  label: string;
  value: number;
  variant?: any;
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: ReactNode
  ) => void;
  options: any;
  error?: any;
};

export default function Select(props: Props) {
  const {
    name,
    label,
    value,
    variant,
    onChange,
    options,
    error = null,
  } = props;

  return (
    <FormControl
      variant={variant || "outlined"}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {options.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
