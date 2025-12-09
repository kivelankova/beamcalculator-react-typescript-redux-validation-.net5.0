import { ActionTypes } from "../constants/action-types";

export const setForceTypes = (kuormatyypit: any) => {
  return {
    type: ActionTypes.SET_FORCETYPES,
    payload: kuormatyypit,
  };
};

export const selectedForceType = (product: any) => {
  return {
    type: ActionTypes.SELECTED_FORCETYPE,
    payload: product,
  };
};
