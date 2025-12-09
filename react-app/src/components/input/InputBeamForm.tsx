import React, { useState, useEffect } from "react";
import { Grid, Paper, Button as MuiButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Form from "../../layouts/Form";
import { useForm } from "../useForm";
import { Input, Button } from "../../control";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../../redux/actions/valuesActions";
import { addInput } from "../../redux/actions/inputActions";
import { useTranslation } from "react-i18next";

// import images from local
// import img0 from "../../images/supportsWithBeam.png";
const img0 = require("../../images/supportsWithBeam.png");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface InputBeamFormValues {
  id: number;
  beamName: string;
  beamDefinition: string;
  span: string;
  a: string;
  b: string;
  materialId: null | number;
  materialNumber: number;
  width: string;
  height: string;
}

const initialFValues: InputBeamFormValues = {
  id: 0,
  beamName: "",
  beamDefinition: "",
  span: "",
  a: "",
  b: "",
  materialId: null,
  materialNumber: 0,
  width: "",
  height: "",
};

export default function InputBeamForm() {
  const { t } = useTranslation(["inputbeamform", "validation"]);
  const validate = (fieldValues = values): any => {
    let temp = { ...errors };
    if ("beamName" in fieldValues)
      temp.beamName = fieldValues.beamName ? "" : t("validation:beamName");
    if ("span" in fieldValues)
      temp.span = fieldValues.span > 0 ? "" : t("validation:span");
    if ("a" in fieldValues)
      temp.a =
        parseFloat(fieldValues.a) >= 0 &&
        parseFloat(fieldValues.a) < parseFloat(values.span)
          ? ""
          : t("validation:a");
    if ("b" in fieldValues)
      temp.b =
        parseFloat(fieldValues.b) > parseFloat(values.a) &&
        parseFloat(fieldValues.b) <= parseFloat(values.span)
          ? ""
          : t("validation:b");

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    checkForm,
  } = useForm({ initialFValues, validateOnChange: true, validate });

  const dispatch = useDispatch();
  const arvot = useSelector((state: any) => state.input.input);

  useEffect(() => {
    if (arvot.default) {
      setValues(initialFValues);

      dispatch(
        addValue({
          beamId: 0,
          beamName: "",
          beamDefinition: "",
          span: "",
          a: "",
          b: "",
        })
      );
      dispatch(
        addInput({
          beamName: "",
          beamDefinition: "",
          span: "",
          a: "",
          b: "",
          default: false,
        })
      );
    }
  }, [arvot]);

  useEffect(() => {
    if (arvot.validation === "check") {
      console.log("Check");
      if (validate()) {
        checkForm();
      }
      dispatch(addInput({ validation: "" }));
    }
    if (arvot.default) {
      console.log("reset");

      resetForm();
      dispatch(addInput({ default: false }));
    }
  }, [arvot]);

  return (
    <>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item elevation={3}>
              <Stack direction="column" justifyContent="center">
                <h4>{t("inputbeamform:title")}</h4>
                <hr />
                <Input
                  label={t("inputbeamform:beamName")}
                  name="beamName"
                  value={values.beamName}
                  onChange={handleInputChange}
                  error={errors.beamName}
                />
                <Input
                  label={t("inputbeamform:beamDefinition")}
                  name="beamDefinition"
                  value={values.beamDefinition}
                  onChange={handleInputChange}
                />

                <img
                  src={img0}
                  alt="PointLoad"
                  style={{ width: "100%", height: "100%" }}
                />
                <Input
                  type="number"
                  label={t("inputbeamform:span")}
                  name="span"
                  value={values.span}
                  onChange={handleInputChange}
                  error={errors.span}
                />
                <Input
                  type="number"
                  label={t("inputbeamform:a")}
                  name="a"
                  value={values.a}
                  onChange={handleInputChange}
                  error={errors.a}
                />
                <Input
                  type="number"
                  label={t("inputbeamform:b")}
                  name="b"
                  value={values.b}
                  onChange={handleInputChange}
                  error={errors.b}
                />
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
