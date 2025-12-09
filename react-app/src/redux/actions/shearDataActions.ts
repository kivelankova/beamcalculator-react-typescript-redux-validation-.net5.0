import { ActionTypes } from "../constants/action-types";

export const addShearData = (data: any) => {
  return {
    type: ActionTypes.ADD_SHEAR_DATA,
    payload: data,
  };
};
