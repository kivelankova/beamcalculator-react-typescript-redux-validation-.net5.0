import React, {
  useState,
  useEffect,
  FC,
  ChangeEvent,
  EventHandler,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setForceTypes,
  selectedForceType,
} from "../../redux/actions/forceTypesActions";
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import {
  Grid,
  Paper,
  makeStyles,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Form from "../../layouts/Form";
import { Button } from "../../control";
import InputForce from "../../control/InputForce";
import {
  addValue,
  removeSelectedValueFT1,
  removeSelectedValueFT2,
  removeSelectedValueFT3,
  removeSelectedValueFT4,
} from "../../redux/actions/valuesActions";
import {
  addLoad,
  removeSelectedLoadFT1,
  removeSelectedLoadFT2,
  removeSelectedLoadFT3,
  removeSelectedLoadFT4,
} from "../../redux/actions/loadsActions";
import { addInput } from "../../redux/actions/inputActions";
import { useTranslation } from "react-i18next";
// import images from local
const img0 = require("../../images/emptyImage.png");
const img1 = require("../../images/BeamPointLoad.png");
const img2 = require("../../images/BeamPointMoment.png");
const img3 = require("../../images/BeamDistributedLoad.png");
const img4 = require("../../images/BeamLinearLoad.png");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode == "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ForceType {
  id: number;
  title: string;
}

interface ForceTypeItem {
  forceTypeId: number;
  forceTypeName: string;
  forceTypeDefinitionEN: string;
  forceTypeDefinitionFI: string;
}

interface ValuesForceTypes {
  [key: string]: string | number | boolean | any[];
  vmax: number;
  vmin: number;
  mmax: number;
  mmin: number;
  types: any[]; // not sure what type this should be
  changed: boolean;
  check: boolean;
  width: number;
  height: number;
  xp1: string | number;
  fy1: string | number;
  xm1: number;
  m1: number;
  xStartUDL1: number;
  xEndUDL1: number;
  fyUDL1: number;
  xStartLDL1: number;
  xEndLDL1: number;
  fy_StartLDL1: number;
  fy_EndLDL1: number;
}

const TypeForm: FC = () => {
  const { t } = useTranslation(["sectionform", "typeform"]);
  const dispatch = useDispatch();
  const kuormatyypit = useSelector(
    (state: any) => state.allForceTypes.forceTypes
  );
  const arvot = useSelector((state: any) => state.input.input);
  const [forceType, setForceType] = useState<number>(0); // Valittu kuormatyyppi (forceType)
  const [forceTypeList, setForceTypeList] = useState<ForceType[]>([]); // Kaikki kuormatyypit (forceTypes)
  const [pointLoadCount, setPointLoadCount] = useState<number>(1); // pistekuorman (PL) järjestysnumero
  const [pointMomentCount, setPointMomentCount] = useState<number>(1); // pistemomentin (PM) järjestysnumero
  const [distributedLoadCount, setDistributedLoadCount] = useState<number>(1); // tasaisen viiivakuorman (UDL) järjestysnumero
  const [linearLoadCount, setLinearLoadCount] = useState<number>(1); // lineaarisen viivakuorman (LDL) järjestysnumero
  const [forceTypeId, setForceTypeId] = useState<any>(0);
  const [click1, setClick1] = useState<number>(1);
  const [click2, setClick2] = useState<number>(1);
  const [click3, setClick3] = useState<number>(1);
  const [click4, setClick4] = useState<number>(1);
  const [valuesForceTypes, setValuesForceTypes] = useState<ValuesForceTypes>({
    vmax: 0,
    vmin: 0,
    mmax: 0,
    mmin: 0,
    types: [],
    changed: false,
    check: false,
    width: 0,
    height: 0,
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
  });
  const [propertyXp, setPropertyXp] = useState<string>("xp1");
  const [propertyFy, setPropertyFy] = useState<string>("fy1");
  const [propertyXm, setPropertyXm] = useState<string>("xm1");
  const [propertyM, setPropertyM] = useState<string>("m1");
  const [propertyXStartUDL, setPropertyXStartUDL] =
    useState<string>("xStartUDL1");
  const [propertyXEndUDL, setPropertyXEndUDL] = useState<string>("xEndUDL1");
  const [propertyFyUDL, setPropertyFyUDL] = useState<string>("fyUDL1");
  const [propertyXStartLDL, setPropertyXStartLDL] =
    useState<string>("xStartLDL1");
  const [propertyXEndLDL, setPropertyXEndLDL] = useState<string>("xEndLDL1");
  const [propertyFy_StartLDL, setPropertyFy_StartLDL] =
    useState<string>("fy_StartLDL1");
  const [propertyFy_EndLDL, setPropertyFy_EndLDL] =
    useState<string>("fy_EndLDL1");

  // Haetaan ForceType:t Backendistä
  const fetchForceTypes = () => {
    if (localStorage.getItem("i18nextLng") === "en") {
      createAPIEndpoint(ENDPOINTS.FORCETYPE)
        .fetchAll()
        .then((res) => {
          let forceTypeList: ForceType[] = res.data.map(
            (item: ForceTypeItem) => ({
              id: item.forceTypeId,
              title: item.forceTypeDefinitionEN,
            })
          );
          forceTypeList = [{ id: 0, title: "-- Selection --" }].concat(
            forceTypeList
          );
          setForceTypeList(forceTypeList);
          dispatch(setForceTypes(res.data));
        })
        .catch((err: any) => console.log(err));
    } else if (localStorage.getItem("i18nextLng") === "fi") {
      createAPIEndpoint(ENDPOINTS.FORCETYPE)
        .fetchAll()
        .then((res) => {
          let forceTypeList: ForceType[] = res.data.map(
            (item: ForceTypeItem) => ({
              id: item.forceTypeId,
              title: item.forceTypeDefinitionFI,
            })
          );
          forceTypeList = [{ id: 0, title: "-- Valinta --" }].concat(
            forceTypeList
          );
          setForceTypeList(forceTypeList);
          dispatch(setForceTypes(res.data));
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    dispatch(
      addValue({
        forceTypeId: null,
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
  }, []);

  useEffect(() => {
    fetchForceTypes();

    if (arvot.default) {
      setForceTypeId(0);
    }
  }, [arvot]);

  // kun valitaan (select) uusi kuormatyyppi (forceType), tässä se uusi arvo sijoitetaan forceType-stateen
  useEffect(() => {
    if (forceTypeId != null) {
      setForceType(forceTypeId);
      dispatch(selectedForceType(kuormatyypit[forceTypeId - 1]));
    }
  }, [forceTypeId, dispatch, kuormatyypit]);

  // Tallentaa input-kenttään luodun paramerin arvon valuesForcetypes-stateMuuttujaan
  // Tallentaa Reduxiin loads/values-stateMuuttujiin
  const handleInputChangeFT = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValuesForceTypes({
      ...valuesForceTypes,
      [name]: value,
      check: false,
    });
    dispatch(
      addValue({
        [name]: value,
        check: false,
      })
    );
    dispatch(
      addLoad({
        [name]: value,
      })
    );
    dispatch(
      addInput({
        default: false,
      })
    );
  };

  // FT 1
  // Lisää seuraavan kuormituksen
  const incrementValueFT1 = () => {
    setClick1(click1 + 1);
    setPointLoadCount(click1 + 1);
    setValuesForceTypes({
      ...valuesForceTypes,
      ["xp" + (click1 + 1)]: 0,
      ["fy" + (click1 + 1)]: 0,
    });

    setPropertyXp("xp" + (click1 + 1));
    setPropertyFy("fy" + (click1 + 1));
  };

  // poistaa aina viimeisimmän luodun pistekuorman
  const decrementValueFT1 = () => {
    console.log("click1", click1);
    console.log("propertyXp", propertyXp);
    if (click1 > 1) {
      setClick1(click1 - 1);
      const newPropertyXp = `xp${click1 - 1}`;
      setPropertyXp(newPropertyXp);
      const newPropertyFy = `fy${click1 - 1}`;
      setPropertyFy(newPropertyFy);
      const newValuesForceTypes: any = { ...valuesForceTypes };
      delete newValuesForceTypes[`xp${click1}`];
      delete newValuesForceTypes[`fy${click1}`];
      setValuesForceTypes(newValuesForceTypes);
      dispatch(removeSelectedLoadFT1(click1));
      dispatch(removeSelectedValueFT1(click1));
    }
    // muuttaa ensimmäisen pistekuorman arvoksi 0
    if (click1 === 1) {
      dispatch(removeSelectedLoadFT1(click1));
      dispatch(removeSelectedValueFT1(click1));
      setValuesForceTypes({
        ...valuesForceTypes,
        ["xp" + 1]: 0,
        ["fy" + 1]: 0,
      });
      dispatch(
        addLoad({
          xp1: 0,
          fy1: 0,
        })
      );
      dispatch(
        addValue({
          xp1: 0,
          fy1: 0,
        })
      );
    }
  };

  // FT 2
  const incrementValueFT2 = () => {
    setClick2(click2 + 1);
    setPointMomentCount(click2 + 1);
    setValuesForceTypes({
      ...valuesForceTypes,
      ["xm" + (click2 + 1)]: 0,
      ["m" + (click2 + 1)]: 0,
    });

    setPropertyXm("xm" + (click2 + 1));
    setPropertyM("m" + (click2 + 1));
  };

  const decrementValueFT2 = () => {
    if (click2 > 1) {
      setClick2(click2 - 1);
      const newPropertyXm = `xm${click2 - 1}`;
      setPropertyXm(newPropertyXm);
      const newPropertyM = `m${click2 - 1}`;
      setPropertyM(newPropertyM);
      const newValuesForceTypes: any = { ...valuesForceTypes };
      delete newValuesForceTypes[`xm${click2}`];
      delete newValuesForceTypes[`m${click2}`];
      setValuesForceTypes(newValuesForceTypes);
      dispatch(removeSelectedLoadFT2(click2));
      dispatch(removeSelectedValueFT2(click2));
    }

    if (click2 === 1) {
      dispatch(removeSelectedLoadFT2(click2));
      dispatch(removeSelectedValueFT2(click2));
      setValuesForceTypes({
        ...valuesForceTypes,
        ["xm" + 1]: 0,
        ["m" + 1]: 0,
      });
      dispatch(
        addLoad({
          xm1: 0,
          m1: 0,
        })
      );
      dispatch(
        addValue({
          xm1: 0,
          m1: 0,
        })
      );
    }
  };

  // FT 3
  const incrementValueFT3 = () => {
    setClick3(click3 + 1);
    setDistributedLoadCount(click3 + 1);
    setValuesForceTypes({
      ...valuesForceTypes,
      ["xStartUDL" + (click3 + 1)]: 0,
      ["xEndUDL" + (click3 + 1)]: 0,
      ["fyUDL" + (click3 + 1)]: 0,
    });

    setPropertyXStartUDL("xStartUDL" + (click3 + 1));
    setPropertyXEndUDL("xEndUDL" + (click3 + 1));
    setPropertyFyUDL("fyUDL" + (click3 + 1));
  };

  const decrementValueFT3 = () => {
    if (click3 > 1) {
      setClick3(click3 - 1);
      const newPropertyXStartUDL = `xStartUDL${click3 - 1}`;
      setPropertyXStartUDL(newPropertyXStartUDL);
      const newPropertyXEndUDL = `xEndUDL${click3 - 1}`;
      setPropertyXEndUDL(newPropertyXEndUDL);
      const newPropertyFyUDL = `fyUDL${click3 - 1}`;
      setPropertyFyUDL(newPropertyFyUDL);
      const newValuesForceTypes: any = { ...valuesForceTypes };
      delete newValuesForceTypes[`xStartUDL${click3}`];
      delete newValuesForceTypes[`xEndUDL${click3}`];
      delete newValuesForceTypes[`fyUDL${click3}`];
      setValuesForceTypes(newValuesForceTypes);
      dispatch(removeSelectedLoadFT3(click3));
      dispatch(removeSelectedValueFT3(click3));
    }

    if (click3 === 1) {
      dispatch(removeSelectedLoadFT3(click3));
      dispatch(removeSelectedValueFT3(click3));
      setValuesForceTypes({
        ...valuesForceTypes,
        ["xStartUDL" + 1]: 0,
        ["xEndUDL" + 1]: 0,
        ["fyUDL" + 1]: 0,
      });
      dispatch(
        addLoad({
          xStartUDL1: 0,
          xEndUDL1: 0,
          fyUDL1: 0,
        })
      );
      dispatch(
        addValue({
          xStartUDL1: 0,
          xEndUDL1: 0,
          fyUDL1: 0,
        })
      );
    }
  };

  // FT 4
  const incrementValueFT4 = () => {
    setClick4(click4 + 1);
    setLinearLoadCount(click4 + 1);
    setValuesForceTypes({
      ...valuesForceTypes,
      ["xStartLDL" + (click4 + 1)]: 0,
      ["xEndLDL" + (click4 + 1)]: 0,
      ["fy_StartLDL" + (click4 + 1)]: 0,
      ["fy_EndLDL" + (click4 + 1)]: 0,
    });

    setPropertyXStartLDL("xStartLDL" + (click4 + 1));
    setPropertyXEndLDL("xEndLDL" + (click4 + 1));
    setPropertyFy_StartLDL("fy_StartLDL" + (click4 + 1));
    setPropertyFy_EndLDL("fy_EndLDL" + (click4 + 1));
  };

  const decrementValueFT4 = () => {
    if (click4 > 1) {
      setClick4(click4 - 1);
      const newPropertyXStartLDL = `xStartLDL${click4 - 1}`;
      setPropertyXStartLDL(newPropertyXStartLDL);
      const newPropertyXEndLDL = `xEndLDL${click4 - 1}`;
      setPropertyXEndLDL(newPropertyXEndLDL);
      const newPropertyFy_StartLDL = `fy_StartLDL${click4 - 1}`;
      setPropertyFy_StartLDL(newPropertyFy_StartLDL);
      const newPropertyFy_EndLDL = `fy_EndLDL${click4 - 1}`;
      setPropertyFy_EndLDL(newPropertyFy_EndLDL);
      const newValuesForceTypes: any = { ...valuesForceTypes };
      delete newValuesForceTypes[`xStartLDL${click4}`];
      delete newValuesForceTypes[`xEndLDL${click4}`];
      delete newValuesForceTypes[`fy_StartLDL${click4}`];
      delete newValuesForceTypes[`fy_EndLDL${click4}`];
      setValuesForceTypes(newValuesForceTypes);
      dispatch(removeSelectedLoadFT4(click4));
      dispatch(removeSelectedValueFT4(click4));
    }

    if (click4 === 1) {
      dispatch(removeSelectedLoadFT4(click4));
      dispatch(removeSelectedValueFT4(click4));
      setValuesForceTypes({
        ...valuesForceTypes,
        ["xStartLDL" + 1]: 0,
        ["xEndLDL" + 1]: 0,
        ["fy_StartLDL" + 1]: 0,
        ["fy_EndLDL" + 1]: 0,
      });
      dispatch(
        addLoad({
          xStartLDL1: 0,
          xEndLDL1: 0,
          fy_StartLDL1: 0,
          fy_EndLDL1: 0,
        })
      );
      dispatch(
        addValue({
          xStartLDL1: 0,
          xEndLDL1: 0,
          fy_StartLDL1: 0,
          fy_EndLDL1: 0,
        })
      );
    }
  };

  useEffect(() => {
    if (arvot.default) {
      setValuesForceTypes({
        ...valuesForceTypes,
        ["xp" + 1]: 0,
        ["fy" + 1]: 0,
        ["xm" + 1]: 0,
        ["m" + 1]: 0,
        ["xStartUDL" + 1]: 0,
        ["xEndUDL" + 1]: 0,
        ["fyUDL" + 1]: 0,
        ["xStartLDL" + 1]: 0,
        ["xEndLDL" + 1]: 0,
        ["fy_StartLDL" + 1]: 0,
        ["fy_EndLDL" + 1]: 0,
        ["xp" + 2]: 0,
        ["fy" + 2]: 0,
        ["xm" + 2]: 0,
        ["m" + 2]: 0,
        ["xStartUDL" + 2]: 0,
        ["xEndUDL" + 2]: 0,
        ["fyUDL" + 2]: 0,
        ["xStartLDL" + 2]: 0,
        ["xEndLDL" + 2]: 0,
        ["fy_StartLDL" + 2]: 0,
        ["fy_EndLDL" + 2]: 0,
        ["xp" + 3]: 0,
        ["fy" + 3]: 0,
        ["xm" + 3]: 0,
        ["m" + 3]: 0,
        ["xStartUDL" + 3]: 0,
        ["xEndUDL" + 3]: 0,
        ["fyUDL" + 3]: 0,
        ["xStartLDL" + 3]: 0,
        ["xEndLDL" + 3]: 0,
        ["fy_StartLDL" + 3]: 0,
        ["fy_EndLDL" + 3]: 0,
      });
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
        addValue({
          width: 0,
          height: 0,
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
    }
  }, [arvot]);

  return (
    <>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item elevation={3}>
              <Stack direction="column" justifyContent="center">
                <hr />
                <label>
                  {t("sectionform:titleSelectType")}
                  <select
                    // label="ForceType"
                    name="forceTypeId"
                    value={forceTypeId ? forceTypeId : " "}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setForceTypeId(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {forceTypeList.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  {forceType == 0 ? (
                    <img
                      src={img0}
                      alt="Empty"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : forceType == 1 ? (
                    <img
                      src={img1}
                      alt="PointLoad"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : forceType == 2 ? (
                    <img
                      src={img2}
                      alt="MomentLoad"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : forceType == 3 ? (
                    <img
                      src={img3}
                      alt="DistributedLoad"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : forceType == 4 ? (
                    <img
                      src={img4}
                      alt="LinearLoad"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : null}
                </div>
                {forceType == 1 ? (
                  <div>
                    <label>
                      <b>
                        {click1}
                        {t("typeform:pointLoad")}
                      </b>
                    </label>
                    <InputForce
                      label={propertyXp}
                      name={propertyXp}
                      value={valuesForceTypes[propertyXp]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyFy}
                      name={propertyFy}
                      value={valuesForceTypes[propertyFy]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    {click1 + 1 < 4 ? (
                      <Button variant="contained" onClick={incrementValueFT1}>
                        {t("typeform:add")} {click1 + 1}
                        {t("typeform:pointLoad")}
                      </Button>
                    ) : null}
                    <br />
                    {click1 === 1 &&
                    valuesForceTypes[propertyXp] === 0 &&
                    valuesForceTypes[propertyFy] === 0 ? null : (
                      <Button variant="contained" onClick={decrementValueFT1}>
                        {t("typeform:empty")} {click1}
                        {t("typeform:pointLoad")}
                      </Button>
                    )}
                  </div>
                ) : null}
                {forceType == 2 ? (
                  <div>
                    <label>
                      <b>
                        {click2}
                        {t("typeform:pointMoment")}
                      </b>
                    </label>
                    <InputForce
                      label={propertyXm}
                      name={propertyXm}
                      value={valuesForceTypes[propertyXm]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyM}
                      name={propertyM}
                      value={valuesForceTypes[propertyM]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    {click2 + 1 < 4 ? (
                      <Button variant="contained" onClick={incrementValueFT2}>
                        {t("typeform:add")} {click2 + 1}
                        {t("typeform:pointMoment")}
                      </Button>
                    ) : null}
                    <br />
                    {click2 === 1 &&
                    valuesForceTypes[propertyXm] === 0 &&
                    valuesForceTypes[propertyM] === 0 ? null : (
                      <Button variant="contained" onClick={decrementValueFT2}>
                        {t("typeform:empty")} {click2}
                        {t("typeform:pointMoment")}
                      </Button>
                    )}
                  </div>
                ) : null}
                {forceType == 3 ? (
                  <div>
                    <label>
                      <b>
                        {click3}
                        {t("typeform:distributedLoad")}
                      </b>
                    </label>
                    <InputForce
                      label={propertyXStartUDL}
                      name={propertyXStartUDL}
                      value={valuesForceTypes[propertyXStartUDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyXEndUDL}
                      name={propertyXEndUDL}
                      value={valuesForceTypes[propertyXEndUDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyFyUDL}
                      name={propertyFyUDL}
                      value={valuesForceTypes[propertyFyUDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    {click3 + 1 < 4 ? (
                      <Button variant="contained" onClick={incrementValueFT3}>
                        {t("typeform:add")} {click3 + 1}
                        {t("typeform:distributedLoad")}
                      </Button>
                    ) : null}
                    <br />
                    {click3 === 1 &&
                    valuesForceTypes[propertyXStartUDL] === 0 &&
                    valuesForceTypes[propertyXEndUDL] === 0 &&
                    valuesForceTypes[propertyFyUDL] === 0 ? null : (
                      <Button variant="contained" onClick={decrementValueFT3}>
                        {t("typeform:empty")} {click3}
                        {t("typeform:distributedLoad")}
                      </Button>
                    )}
                  </div>
                ) : null}
                {forceType == 4 ? (
                  <div>
                    <label>
                      <b>
                        {click4}
                        {t("typeform:linearLoad")}
                      </b>
                    </label>
                    <InputForce
                      label={propertyXStartLDL}
                      name={propertyXStartLDL}
                      value={valuesForceTypes[propertyXStartLDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyXEndLDL}
                      name={propertyXEndLDL}
                      value={valuesForceTypes[propertyXEndLDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyFy_StartLDL}
                      name={propertyFy_StartLDL}
                      value={valuesForceTypes[propertyFy_StartLDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    <InputForce
                      label={propertyFy_EndLDL}
                      name={propertyFy_EndLDL}
                      value={valuesForceTypes[propertyFy_EndLDL]}
                      onChange={handleInputChangeFT}
                      variant={undefined}
                      error={undefined}
                      other={undefined}
                    />
                    {click4 + 1 < 4 ? (
                      <Button variant="contained" onClick={incrementValueFT4}>
                        {t("typeform:add")} {click4 + 1}
                        {t("typeform:linearLoad")}
                      </Button>
                    ) : null}
                    <br />
                    {click4 === 1 &&
                    valuesForceTypes[propertyXStartLDL] === 0 &&
                    valuesForceTypes[propertyXEndLDL] === 0 &&
                    valuesForceTypes[propertyFy_StartLDL] === 0 &&
                    valuesForceTypes[propertyFy_EndLDL] === 0 ? null : (
                      <Button variant="contained" onClick={decrementValueFT4}>
                        {t("typeform:empty")} {click4}
                        {t("typeform:linearLoad")}
                      </Button>
                    )}
                  </div>
                ) : null}
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default TypeForm;
