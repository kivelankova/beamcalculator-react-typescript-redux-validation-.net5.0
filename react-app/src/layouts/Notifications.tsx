import React, { ChangeEvent } from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
    "& .MuiAlert-root": {
      backgroundColor: "#f3b33d",
      color: "#000",
    },
    "& .MuiAlert-icon": {
      color: "#000",
    },
  },
}));

type Props = {
  notify: { isOpen: boolean; message?: string };
  setNotify: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; message?: string }>
  >;
  onClose?: () => void;
};

export default function Notification(props: Props) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      className={classes.root}
      open={notify.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={() => handleClose}>{notify.message}</Alert>
    </Snackbar>
  );
}
