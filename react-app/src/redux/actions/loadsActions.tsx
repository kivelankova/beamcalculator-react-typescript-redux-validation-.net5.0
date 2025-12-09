import { ActionTypes } from "../constants/action-types";

export const addLoad = (load: any) => {
  return {
    type: ActionTypes.ADD_LOAD,
    payload: load,
  };
};
export const removeSelectedLoadFT1 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_LOAD_FT1,
    payload: click,
  };
};
export const removeSelectedLoadFT2 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_LOAD_FT2,
    payload: click,
  };
};
export const removeSelectedLoadFT3 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_LOAD_FT3,
    payload: click,
  };
};
export const removeSelectedLoadFT4 = (click: any) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_LOAD_FT4,
    payload: click,
  };
};
