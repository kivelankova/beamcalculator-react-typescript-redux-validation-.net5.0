import { ActionTypes } from "../constants/action-types";

const intialState = {
  values: [],
};

// Tallennetaan kaikki palkit values-tilaan

export const valuesReducer = (state: any = {}, action: any) => {
  if (action.type === ActionTypes.ADD_VALUE) {
    // Create a copy (clone) of current state -> Object.assign
    // Then combine old array with new article
    // Luo kopio (klooni) nykyisestä tilasta -> Object.assign
    // Yhdistä sitten vanha taulukko uuteen artikkeliin
    return {
      ...state,
      values: { ...state.values, ...action.payload },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_VALUE_FT1) {
    delete state.values["xp" + action.payload];
    delete state.values["fy" + action.payload];
    return {
      ...state,
      values: {
        ...state.values,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_VALUE_FT2) {
    delete state.values["xm" + action.payload];
    delete state.values["m" + action.payload];
    return {
      ...state,
      values: {
        ...state.values,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_VALUE_FT3) {
    delete state.values["xStartUDL" + action.payload];
    delete state.values["xEndUDL" + action.payload];
    delete state.values["fyUDL" + action.payload];
    return {
      ...state,
      values: {
        ...state.values,
      },
    };
  } else if (action.type === ActionTypes.REMOVE_SELECTED_VALUE_FT4) {
    delete state.values["xStartLDL" + action.payload];
    delete state.values["xEndLDL" + action.payload];
    delete state.values["fy_StartLDL" + action.payload];
    delete state.values["fy_EndLDL" + action.payload];
    return {
      ...state,
      values: {
        ...state.values,
      },
    };
  }

  return state;
};
