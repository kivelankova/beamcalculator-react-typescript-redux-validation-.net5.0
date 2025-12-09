import { ActionTypes } from "../constants/action-types";

const inititalState = {
  forceTypes: [],
};

// Tallennetaan kaikki palkit beams-tilaan
export const forceTypesReducer = (state: any = inititalState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_FORCETYPES:
      return {
        ...state,
        forceTypes: action.payload,
      };
    default:
      return state;
  }
};

export const selectedforceTypeReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ActionTypes.SELECTED_FORCETYPE:
      return { ...state, ...action.payload };
    // case ActionTypes.REMOVE_SELECTED_PRODUCT:
    //   return {};
    default:
      return state;
  }
};
