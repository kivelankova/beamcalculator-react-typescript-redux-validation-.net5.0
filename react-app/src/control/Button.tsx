import React, { MouseEventHandler } from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
  },
}));

type Props = {
  children: React.ReactNode;
  color?: "inherit" | "default" | "primary" | "secondary";
  variant?: "text" | "outlined" | "contained";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className?: string;
  other?: any;
};

export default function Button(props: Props) {
  const {
    children,
    color = "default",
    variant = "contained",
    onClick,
    className = "",
    ...other
  } = props;
  const classes = useStyles();

  return (
    <MuiButton
      className={`${classes.root} ${className}`}
      variant={variant}
      color={color}
      onClick={onClick}
      {...other}
    >
      {children}
    </MuiButton>
  );
}
