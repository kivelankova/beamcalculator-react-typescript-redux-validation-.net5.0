import React from "react";
import { Grid } from "@material-ui/core";
import ButtonBeamForm from "./ButtonBeamForm";
import InputBeamForm from "./InputBeamForm";
import TypeForm from "./TypeForm";
import SelectedValuesForm from "./SelectedValuesForm";
import SectionForm from "./SectionForm";

export default function Beam() {
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <ButtonBeamForm />
        </Grid>
        <Grid item xs={5}>
          <InputBeamForm />
        </Grid>
        <Grid item xs={5}>
          <SectionForm
            materialList={[]}
            materialNumber={undefined}
            onChange={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <TypeForm />
        </Grid>
        <Grid item xs={2}>
          <SelectedValuesForm />
        </Grid>
      </Grid>
    </>
  );
}
