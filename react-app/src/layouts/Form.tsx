import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

type Props = {
  children: any;
  other?: any;
};

export default function Form(props: Props) {
  const classes = useStyles();
  const { children, ...other } = props;

  // let obj = {
  //     name: 'Keijo',
  //     age: '20',
  //     city: 'Kuopio'
  // }
  // const {name, age, ...address} = obj
  // address = {
  //     city: 'Kuopio'
  // }

  return (
    <form className={classes.root} noValidate autoComplete="off" {...other}>
      {children}
    </form>
  );
}
