import { ActionTypes } from "../constants/action-types";

export const addResult = (result: any) => {
  return {
    type: ActionTypes.ADD_RESULT,
    payload: result,
  };
};
