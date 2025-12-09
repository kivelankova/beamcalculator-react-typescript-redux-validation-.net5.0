import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Input {
  [key: string]: string | null | undefined;
}

interface Loads {
  [key: string]: string | null | undefined;
}

const SelectedValuesForm: FC = () => {
  const { t } = useTranslation(["selectedvaluesform"]);
  const input: Input = useSelector((state: any) => state.input.input);
  const loads: Loads = useSelector((state: any) => state.loads.loads);

  // Kopioidaan formData-objekti. Luodaan tyhjä values-objekti "target"
  function bestCopyEver(src: Input | Loads) {
    return Object.assign({}, src);
  }

  const target = bestCopyEver(input);

  delete target.forceTypeId;
  delete target.beamDefinition;
  delete target.check;
  delete target.types;
  delete target.default;
  delete target.language;
  Object.keys(target).map((k) =>
    target[k] == "" ? delete target[k] : target[k]
  );
  Object.keys(target).map((k) =>
    target[k] == null ? delete target[k] : target[k]
  );

  const targetForces = bestCopyEver(loads);
  delete targetForces.forceTypeId;

  Object.keys(targetForces).map((k) =>
    targetForces[k] == "" ? delete targetForces[k] : targetForces[k]
  );
  Object.keys(targetForces).map((k) =>
    targetForces[k] == null ? delete targetForces[k] : targetForces[k]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item elevation={3}>
            <Stack direction="column" justifyContent="center">
              <h4>{t("selectedvaluesform:title")}</h4>
              <hr />
              <h5>{t("selectedvaluesform:geometry")}</h5>
              {Object.keys(target).length !== 0 ? (
                Object.keys(target).map((key) => {
                  return (
                    <div key={key}>
                      <p>
                        {key}: {target[key]}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>{t("selectedvaluesform:empty")}</p>
              )}
              <h5>{t("selectedvaluesform:forces")}</h5>
              {Object.keys(targetForces).length !== 0 ? (
                Object.keys(targetForces).map((key) => {
                  return (
                    <div key={key}>
                      <p>
                        {key}: {targetForces[key]}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>{t("selectedvaluesform:empty")}</p>
              )}
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectedValuesForm;
