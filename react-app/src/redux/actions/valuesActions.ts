import { ActionTypes } from "../constants/action-types";

export const addValue = (value: any) => {
  return {
    type: ActionTypes.ADD_VALUE,
    payload: value,
  };
};
export const removeSelectedValueFT1 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_VALUE_FT1,
    payload: click,
  };
};
export const removeSelectedValueFT2 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_VALUE_FT2,
    payload: click,
  };
};
export const removeSelectedValueFT3 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_VALUE_FT3,
    payload: click,
  };
};
export const removeSelectedValueFT4 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_VALUE_FT4,
    payload: click,
  };
};
