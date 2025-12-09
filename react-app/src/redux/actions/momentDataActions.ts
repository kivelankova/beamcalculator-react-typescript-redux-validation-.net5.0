import { ActionTypes } from "../constants/action-types";

export const addMomentData = (data: any) => {
  return {
    type: ActionTypes.ADD_MOMENT_DATA,
    payload: data,
  };
};
