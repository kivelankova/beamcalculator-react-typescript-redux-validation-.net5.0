import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../redux/actions/valuesActions";
import { addInput } from "../redux/actions/inputActions";
// import { RootState } from "../redux/store";

interface FormValues {
  [key: string]: any;
}

interface Errors {
  [key: string]: string;
}

interface UseFormProps {
  initialFValues: FormValues;
  validateOnChange?: boolean;
  validate?: any;
}

export function useForm({
  initialFValues,
  validateOnChange = false,
  validate,
}: UseFormProps) {
  const [values, setValues] = useState<FormValues>(initialFValues);
  const [errors, setErrors] = useState<Errors>({});

  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      validate({ [name]: value });
      // console.log("fieldErrors[name]", fieldErrors[name]);
      // setErrors({
      //   ...errors,
      //   [name]: fieldErrors[name],
      // });
    }

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
  };

  const checkForm = () => {
    // setValues(initialFValues);
    setErrors({});
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    checkForm,
  };
}
