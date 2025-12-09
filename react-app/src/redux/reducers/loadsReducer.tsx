import { ActionTypes } from "../constants/action-types";

const intialState = {
  loads: [],
};

// Tallennetaan kaikki palkit values-tilaan
export const loadsReducer = (state: any = {}, action: any) => {
  if (action.type === ActionTypes.ADD_LOAD) {
    return {
      ...state,
      loads: { ...state.loads, ...action.payload },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_LOAD_FT1) {
    delete state.loads["xp" + action.payload];
    delete state.loads["fy" + action.payload];
    return {
      ...state,
      loads: {
        ...state.loads,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_LOAD_FT2) {
    delete state.loads["xm" + action.payload];
    delete state.loads["m" + action.payload];
    return {
      ...state,
      loads: {
        ...state.loads,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_LOAD_FT3) {
    delete state.loads["xStartUDL" + action.payload];
    delete state.loads["xEndUDL" + action.payload];
    delete state.loads["fyUDL" + action.payload];
    return {
      ...state,
      loads: {
        ...state.loads,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_LOAD_FT4) {
    delete state.loads["xStartLDL" + action.payload];
    delete state.loads["xEndLDL" + action.payload];
    delete state.loads["fy_StartLDL" + action.payload];
    delete state.loads["fy_EndLDL" + action.payload];
    return {
      ...state,
      loads: {
        ...state.loads,
      },
    };
  }

  return state;
};
