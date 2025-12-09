import React, { useState, useEffect, FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { Button } from "../../control";
import { Grid, Paper } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Calculator from "./Calculator";
import ResultList from "./ResultList";
import Notification from "../../layouts/Notifications";
import { addResult } from "../../redux/actions/resultsActions";
import { addValue } from "../../redux/actions/valuesActions";
import { addLoad } from "../../redux/actions/loadsActions";
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

const ButtonResultForm: FC<ButtonProps> = () => {
  const { t } = useTranslation(["result"]);
  const dispatch = useDispatch();
  const values = useSelector((state: any) => state.values.values);
  const results = useSelector((state: any) => state.results.results);
  const [notify, setNotify] = useState({ isOpen: false });
  const [createBeamId, setCreateBeamId] = useState<number | null>(null); // luodun palkin Id
  const [updateResult, setUpdateResult] = useState<boolean>(false);
  // luodaan state-muuttuja, jolla hallinnoidaan Laske tulos-nappia Calculator-tiedostossa
  const [showResultButton, setShowResultButton] = useState<boolean>(false);
  const [typeLkm, setTypeLkm] = useState<number>(0);
  // let typeLkm: number = 0; // Kuormakombinaatoiden lkm (1, 2 tai 3)

  // Jos lähtötiedot riittävät, voidaan showResultButton asettaa "true"
  useEffect(() => {
    if (
      values.span !== "" &&
      values.b !== "" &&
      ((values.fy1 !== 0 &&
        values.fy1 !== "-" &&
        values.fy1 !== "+" &&
        values.fy1.length !== 0) ||
        (values.m1 !== 0 &&
          values.m1 !== "-" &&
          values.m1 !== "+" &&
          values.m1.length !== 0) ||
        (values.xEndUDL1 !== 0 &&
          values.fyUDL1 !== 0 &&
          values.fyUDL1 !== "-" &&
          values.fyUDL1 !== "+" &&
          values.fyUDL1.length !== 0) ||
        (values.xEndLDL1 !== 0 &&
          (values.fy_StartLDL1 !== 0 || values.fy_EndLDL1 !== 0) &&
          values.fy_StartLDL1 !== "-" &&
          values.fy_StartLDL1 !== "+" &&
          values.fy_StartLDL1.length !== 0 &&
          values.fy_EndLDL1 !== "-" &&
          values.fy_EndLDL1 !== "+" &&
          values.fy_EndLDL1.length !== 0))
    ) {
      setShowResultButton(true);
    } else {
      setShowResultButton(false);
    }
  }, [values]);

  const onCreateBeam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      values.fy1 !== 0 ||
      values.m1 !== 0 ||
      values.fyUDL1 !== 0 ||
      values.fy_StartLDL1 !== 0 ||
      values.fy_EndLDL1 !== 0
    ) {
      setTypeLkm(1);
    }
    if (
      values.fy2 !== 0 ||
      values.m2 !== 0 ||
      values.fyUDL2 !== 0 ||
      values.fy_StartLDL2 !== 0 ||
      values.fy_EndLDL2 !== 0
    ) {
      setTypeLkm(2);
    }
    if (
      values.fy3 !== 0 ||
      values.m3 !== 0 ||
      values.fyUDL3 !== 0 ||
      values.fy_StartLDL3 !== 0 ||
      values.fy_EndLDL3 !== 0
    ) {
      setTypeLkm(3);
    }

    // Uuden palkin (beam) luonti tietokantaan Beams-tauluun
    if (values.beamId === 0) {
      const postData = {
        beamName: values.beamName,
        beamDefinition: values.beamDefinition,
        span: values.span,
        a: values.a,
        b: values.b,
        s1: results.S1,
        s2: results.S2,
        vmax: results.Vmax,
        vmin: results.Vmin,
        mmax: results.Mmax,
        mmin: results.Mmin,
        dmax: results.Dmax,
        dmin: results.Dmin,
      };
      createAPIEndpoint(ENDPOINTS.BEAM)
        .create(postData)
        .then((response) => {
          // otetaan luotu beamId talteen createBeamId-stateen
          setCreateBeamId(response.data.beamId);
          setNotify((prevState) => ({
            ...prevState,
            isOpen: true,
            message: "Palkki luotu",
          }));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (
      createBeamId !== null &&
      (typeLkm == 1 || typeLkm == 2 || typeLkm == 3)
    ) {
      const postType1 = {
        xp: values.xp1,
        fy: values.fy1,
        xm: values.xm1,
        m: values.m1,
        xStartUDL: values.xStartUDL1,
        xEndUDL: values.xEndUDL1,
        fyUDL: values.fyUDL1,
        xStartLDL: values.xStartLDL1,
        xEndLDL: values.xEndLDL1,
        fy_StartLDL: values.fy_StartLDL1,
        fy_EndLDL: values.fy_EndLDL1,
        beamId: createBeamId,
      };
      createAPIEndpoint(ENDPOINTS.TYPE)
        .create(postType1)
        .then((response) => {
          setNotify((prevState) => ({
            ...prevState,
            isOpen: true,
            message: "Uusi palkki (beam) ja kuormitukset (type1) on luotu.",
          }));
        });
    }

    if (createBeamId !== null && (typeLkm == 2 || typeLkm == 3)) {
      const postType2 = {
        xp: values.xp2,
        fy: values.fy2,
        xm: values.xm2,
        m: values.m2,
        xStartUDL: values.xStartUDL2,
        xEndUDL: values.xEndUDL2,
        fyUDL: values.fyUDL2,
        xStartLDL: values.xStartLDL2,
        xEndLDL: values.xEndLDL2,
        fy_StartLDL: values.fy_StartLDL2,
        fy_EndLDL: values.fy_EndLDL2,
        beamId: createBeamId,
      };
      createAPIEndpoint(ENDPOINTS.TYPE)
        .create(postType2)
        .then((response) => {
          setNotify((prevState) => ({
            ...prevState,
            isOpen: true,
            message: "Uusi palkki (beam) ja kuormitukset (type2) on luotu.",
          }));
        });
    }

    if (createBeamId !== null && typeLkm == 3) {
      const postType3 = {
        xp: values.xp3,
        fy: values.fy3,
        xm: values.xm3,
        m: values.m3,
        xStartUDL: values.xStartUDL3,
        xEndUDL: values.xEndUDL3,
        fyUDL: values.fyUDL3,
        xStartLDL: values.xStartLDL3,
        xEndLDL: values.xEndLDL3,
        fy_StartLDL: values.fy_StartLDL3,
        fy_EndLDL: values.fy_EndLDL3,
        beamId: createBeamId,
      };
      createAPIEndpoint(ENDPOINTS.TYPE)
        .create(postType3)
        .then((response) => {
          setNotify((prevState) => ({
            ...prevState,
            isOpen: true,
            message: "Uusi palkki (beam) ja kuormitukset (type3) on luotu.",
          }));
        });
    }

    setUpdateResult(true);
  }, [createBeamId, typeLkm]);

  const onDeleteBeam = () => {
    dispatch(
      addValue({
        beamId: 0,
        beamName: "",
        beamDefinition: "",
        span: "",
        a: "",
        b: "",
        materialNumber: 0,
        width: 0,
        height: 0,
        s1: 0,
        s2: 0,
        vmax: 0,
        vmin: 0,
        mmax: 0,
        mmin: 0,
        dmax: 0,
        dmin: 0,
        types: [],
        xp1: 0,
        fy1: 0,
        xm1: 0,
        m1: 0,
        xStartUDL1: 0,
        xEndUDL1: 0,
        fyUDL1: 0,
        xStartLDL1: 0,
        xEndLDL1: 0,
        fy_StartLDL1: 0,
        fy_EndLDL1: 0,
        xp2: 0,
        fy2: 0,
        xm2: 0,
        m2: 0,
        xStartUDL2: 0,
        xEndUDL2: 0,
        fyUDL2: 0,
        xStartLDL2: 0,
        xEndLDL2: 0,
        fy_StartLDL2: 0,
        fy_EndLDL2: 0,
        xp3: 0,
        fy3: 0,
        xm3: 0,
        m3: 0,
        xStartUDL3: 0,
        xEndUDL3: 0,
        fyUDL3: 0,
        xStartLDL3: 0,
        xEndLDL3: 0,
        fy_StartLDL3: 0,
        fy_EndLDL3: 0,
        forceTypeId: null,
        check: false,
      })
    );
    dispatch(
      addResult({
        S1: 0,
        S2: 0,
        Vmax: 0,
        Vmin: 0,
        Mmax: 0,
        Mmin: 0,
        Dmax: 0,
        Dmin: 0,
      })
    );
    dispatch(
      addLoad({
        xp1: 0,
        fy1: 0,
        xm1: 0,
        m1: 0,
        xStartUDL1: 0,
        xEndUDL1: 0,
        fyUDL1: 0,
        xStartLDL1: 0,
        xEndLDL1: 0,
        fy_StartLDL1: 0,
        fy_EndLDL1: 0,
        xp2: 0,
        fy2: 0,
        xm2: 0,
        m2: 0,
        xStartUDL2: 0,
        xEndUDL2: 0,
        fyUDL2: 0,
        xStartLDL2: 0,
        xEndLDL2: 0,
        fy_StartLDL2: 0,
        fy_EndLDL2: 0,
        xp3: 0,
        fy3: 0,
        xm3: 0,
        m3: 0,
        xStartUDL3: 0,
        xEndUDL3: 0,
        fyUDL3: 0,
        xStartLDL3: 0,
        xEndLDL3: 0,
        fy_StartLDL3: 0,
        fy_EndLDL3: 0,
      })
    );
    dispatch(
      addInput({
        beamName: "",
        beamDefinition: "",
        span: 0,
        a: 0,
        b: 0,
        materialNumber: 0,
        width: 0,
        height: 0,
      })
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item elevation={3}>
            <Stack direction="row" justifyContent="center">
              <h1>{t("result:titleButton")}</h1>
              <Calculator />
              {values.check &&
              (values.fy1 !== 0 ||
                values.m1 !== 0 ||
                values.fyUDL1 !== 0 ||
                values.fy_StartLDL1 !== 0 ||
                values.fy_EndLDL1 !== 0) ? (
                <div>
                  <Button variant="contained" onClick={onCreateBeam}>
                    {t("result:buttonSaveResult")}
                  </Button>
                  <Button variant="contained" onClick={onDeleteBeam}>
                    {t("result:buttonEmptyResult")}
                  </Button>
                </div>
              ) : (
                <Button variant="contained" onClick={onDeleteBeam}>
                  {t("result:buttonEmptyResult")}
                </Button>
              )}

              <ResultList
                {...{
                  updateResult,
                  setUpdateResult,
                }}
              />
            </Stack>
          </Item>
        </Grid>
      </Grid>

      <Notification {...{ notify, setNotify }} />
    </>
  );
};

export default ButtonResultForm;
