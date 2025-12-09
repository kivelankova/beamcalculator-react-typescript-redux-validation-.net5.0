import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../../redux/actions/valuesActions";
import { addInput } from "../../redux/actions/inputActions";
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { useForm } from "../useForm";
import { Input } from "../../control";
import Form from "../../layouts/Form";
import { Grid, Paper } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
const img10 = require("../../images/rectangle.png");

const initialFValues = {
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

interface Material {
  id: number;
  title: string;
  number: string;
}

interface Props {
  materialList: Material[];
  materialNumber: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode == "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SectionForm: FC<Props> = () => {
  const { t } = useTranslation(["sectionform", "validation"]);
  const dispatch = useDispatch();
  const arvot = useSelector((state: any) => state.input.input);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [materialList, setMaterialList] = useState([]); // Kaikki kuormatyypit (forceTypes)
  const [materialNumber, setMaterialNumber] = useState(0);
  const [materialId, setMaterialId] = useState<any>(0);

  // Haetaan ForceType:t Backendistä
  const fetchMaterials = () => {
    if (localStorage.getItem("i18nextLng") === "en") {
      createAPIEndpoint(ENDPOINTS.MATERIAL)
        .fetchAll()
        .then((res: any) => {
          let materialList = res.data.map((item: any) => ({
            id: item.materialId,
            title: item.materialNameEN,
            number: item.materialNumber,
          }));
          materialList = [{ id: 0, title: "-- Selection --" }].concat(
            materialList
          );
          setMaterialList(materialList);
          // dispatch(setForceTypes(res.data));
        })
        .catch((err: any) => console.log(err));
    } else if (localStorage.getItem("i18nextLng") === "fi") {
      createAPIEndpoint(ENDPOINTS.MATERIAL)
        .fetchAll()
        .then((res: any) => {
          let materialList = res.data.map((item: any) => ({
            id: item.materialId,
            title: item.materialNameFI,
            number: item.materialNumber,
          }));
          materialList = [{ id: 0, title: "-- Valinta --" }].concat(
            materialList
          );
          setMaterialList(materialList);
          // dispatch(setForceTypes(res.data));
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    dispatch(
      addValue({
        materialId: null,
        width: "",
        height: "",
      })
    );
  }, []);

  useEffect(() => {
    fetchMaterials();

    if (arvot.default) {
      setMaterialId(0);
      setMaterialNumber(0);
      setWidth("");
      setHeight("");

      setValues(initialFValues);

      dispatch(
        addValue({
          materialNumber: 0,
          width: "",
          height: "",
        })
      );
      dispatch(
        addInput({
          materialId: 0,
          materialNumber: 0,
          width: "",
          height: "",
          default: false,
        })
      );
    }
  }, [arvot]);

  const validate = (fieldValues = values): any => {
    let temp = { ...errors };
    if ("width" in fieldValues)
      temp.width = fieldValues.width > 0 ? "" : t("validation:width");
    if ("height" in fieldValues)
      temp.height = fieldValues.height > 0 ? "" : t("validation:height");
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     // employeeService.insertEmployee(values);
  //     resetForm();
  //   }
  // };
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
        <Item elevation={3}>
          <Grid container spacing={0} direction="row">
            <Grid item xs={12}>
              <h4>{t("sectionform:title")}</h4>
              <hr />
            </Grid>
            <Grid item xs={4}>
              <label>
                {t("sectionform:titleSelectMaterial")}
                <select
                  // label="Material"
                  name="materialNumber"
                  // value={materialNumber ? materialNumber : " "}
                  // onChange={handleInputChange}
                  value={materialId ? materialId : " "}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setMaterialId(e.target.value);
                    const { name, value } = e.target;
                    setValues({
                      ...values,
                      [name]: value,
                    });
                    dispatch(
                      addValue({
                        beamId: 0,
                        [name]: value,
                        check: false,
                      })
                    );
                    dispatch(
                      addInput({
                        [name]: value,
                        default: false,
                      })
                    );
                  }}
                >
                  {materialList.map((item: any) => (
                    <option key={item.id} value={item.number}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
            </Grid>
            <Grid item xs={3}>
              <img
                src={img10}
                alt="Rectangle cross section"
                style={{ width: "90%", height: "90%" }}
              />
            </Grid>
            <Grid item xs={4}>
              {t("sectionform:titleSection")}
              <Input
                label={t("sectionform:width")}
                name="width"
                value={values.width}
                onChange={handleInputChange}
                error={errors.width}
              />
              <Input
                label={t("sectionform:height")}
                name="height"
                value={values.height}
                onChange={handleInputChange}
                error={errors.height}
              />
            </Grid>
          </Grid>
        </Item>
      </Form>
    </>
  );
};

export default SectionForm;
