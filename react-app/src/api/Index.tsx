import axios from "axios";

export const ENDPOINTS = {
  BEAM: "Beam",
  TYPE: "Type",
  FORCETYPE: "ForceType",
  MATERIAL: "Material",
};

export const createAPIEndpoint = (endpoint: any) => {
  let url = process.env.REACT_APP_BASE_URL + endpoint + "/";
  return {
    fetchAll: async () => await axios.get(url),
    // fetchById: id => axios.get(url + id),
    create: (newRecord: any) => axios.post(url, newRecord),
    // update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id: any) => axios.delete(url + id),
  };
};
