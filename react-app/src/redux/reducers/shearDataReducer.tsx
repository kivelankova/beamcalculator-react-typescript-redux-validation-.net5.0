import { ActionTypes } from "../constants/action-types";

const intialState = {
  data: {
    labels: [],
    datasets: [
      {
        label: "X-akseli",
        data: [],
        borderColor: "black",
        borderWidth: 3,
        tension: 0.1,
        pointRadius: 0,
      },
      {
        label: "V [kN]",
        data: [],
        backgroundColor: "#97ff97",
        borderColor: "green",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Leikkausvoima-käyrä",
      },
    },
    // maintainAspectRatio: true,
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: false,
    //       },
    //     },
    //   ],
    // },
  },
};
// Tallennetaan kaikki palkit values-tilaan

export const shearDataReducer = (state: any = intialState, action: any) => {
  if (action.type === ActionTypes.ADD_SHEAR_DATA) {
    return {
      ...state,
      shear: { ...state.shear, ...action.payload },
    };
  }

  return state;
};
