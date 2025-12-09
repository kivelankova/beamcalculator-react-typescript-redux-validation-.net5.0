import { ActionTypes } from "../constants/action-types";

const intialState = {
  results: [],
};
// Tallennetaan kaikki palkit values-tilaan

export const resultsReducer = (state: any = {}, action: any) => {
  if (action.type === ActionTypes.ADD_RESULT) {
    return {
      ...state,
      results: { ...state.results, ...action.payload },
    };
  }

  return state;
};
