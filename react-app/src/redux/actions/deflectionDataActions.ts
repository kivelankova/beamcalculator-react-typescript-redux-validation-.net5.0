import { ActionTypes } from "../constants/action-types";

export const addDeflectionData = (data: any) => {
  return {
    type: ActionTypes.ADD_DEFLECTION_DATA,
    payload: data,
  };
};
