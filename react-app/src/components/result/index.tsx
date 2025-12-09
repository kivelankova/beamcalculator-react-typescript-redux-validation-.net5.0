import React from "react";
import { useSelector } from "react-redux";
import ButtonResultForm from "./ButtonResultForm";
import LineChartShear from "./LineChartShear";
import LineChartMoment from "./LineChartMoment";
import LineChartDeflection from "./LineChartDeflection";
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

export default function Result() {
  const { t } = useTranslation(["result"]);
  const values = useSelector((state: any) => state.values.values);
  const results = useSelector((state: any) => state.results.results);

  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <ButtonResultForm />
        </Grid>
        <Grid item xs={3}>
          <Item elevation={3}>
            <Stack>
              <h4>{t("result:titleResults")}</h4>
              <hr />
              {values.check ? (
                Object.keys(results).map((key) => {
                  return (
                    <div key={key}>
                      <p>
                        {key}: {results[key]}
                      </p>
                    </div>
                  );
                })
              ) : (
                <>
                  <p>{t("result:results")}</p>
                </>
              )}
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item elevation={3}>
            <Stack>
              <h4>{t("result:titleDiagrams")}</h4>
              <hr />
              {values.check ? (
                <>
                  <div style={{ width: "70%", height: "70%" }}>
                    <LineChartShear />
                    <LineChartMoment />
                    <LineChartDeflection />
                  </div>
                </>
              ) : (
                <>
                  <p>{t("result:results")}</p>
                </>
              )}
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
