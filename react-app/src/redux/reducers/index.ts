import { combineReducers } from "redux";
import { valuesReducer } from "./valuesReducer";
import { loadsReducer } from "./loadsReducer";
import { inputReducer } from "./inputReducer";
import { shearDataReducer } from "./shearDataReducer";
import { momentDataReducer } from "./momentDataReducer";
import { deflectionDataReducer } from "./deflectionDataReducer";
import { resultsReducer } from "./resultsReducer";
import {
  forceTypesReducer,
  selectedforceTypeReducer,
} from "./forceTypesReducer";

const reducers = combineReducers({
  values: valuesReducer,
  loads: loadsReducer,
  input: inputReducer,
  shear: shearDataReducer,
  moment: momentDataReducer,
  results: resultsReducer,
  allForceTypes: forceTypesReducer,
  forceType: selectedforceTypeReducer,
  deflection: deflectionDataReducer,
});
export default reducers;
