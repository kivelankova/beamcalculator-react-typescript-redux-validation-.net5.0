import { ActionTypes } from "../constants/action-types";

export const addInput = (input: any) => {
  return {
    type: ActionTypes.ADD_INPUT,
    payload: input,
  };
};
