import { ActionTypes } from "../constants/action-types";

const intialState = {
  input: [
    // {
    //   beamName: "Nimi",
    //   beamDefinition: "Kuvaus",
    //   span: 0,
    //   a: 0,
    //   b: 0,
    //   width: 1,
    //   height: 2,
    //   default: false,
    // },
  ],
};

// Tallennetaan kaikki palkit values-tilaan

export const inputReducer = (state: any = intialState, action: any) => {
  if (action.type === ActionTypes.ADD_INPUT) {
    return {
      ...state,
      input: { ...state.input, ...action.payload },
    };
  }

  return state;
};
