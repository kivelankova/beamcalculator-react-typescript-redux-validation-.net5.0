import React, { FC, MouseEventHandler } from "react";
import { Grid, Paper } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "../../control";
import { useDispatch } from "react-redux";
import { addInput } from "../../redux/actions/inputActions";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ButtonProps {
  variant?: "text" | "outlined" | "contained";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonBeamForm: FC<ButtonProps> = () => {
  const { t } = useTranslation(["buttonbeamform"]);
  const dispatch = useDispatch();

  const handleClearInputs = () => {
    dispatch(addInput({ default: true }));
  };

  const handleValidateInputs = () => {
    dispatch(addInput({ validation: "check" }));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item elevation={3}>
            <Stack direction="row" justifyContent="center">
              {/* tyhjennetään kaikki lähtöarvot */}
              <h1>{t("buttonbeamform:title")}</h1>
              <Button variant="contained" onClick={handleClearInputs}>
                {t("buttonbeamform:emptyInput")}
              </Button>
              <Button variant="contained" onClick={handleValidateInputs}>
                {t("buttonbeamform:check")}
              </Button>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};
export default ButtonBeamForm;
