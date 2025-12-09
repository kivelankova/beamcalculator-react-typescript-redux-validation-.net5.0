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
        label: "S [m]",
        data: [],
        backgroundColor: "#D5F3FE",
        borderColor: "blue",
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
        text: "Taipuma-käyrä",
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

export const deflectionDataReducer = (
  state: any = intialState,
  action: any
) => {
  if (action.type === ActionTypes.ADD_DEFLECTION_DATA) {
    return {
      ...state,
      deflection: { ...state.moment, ...action.payload },
    };
  }

  return state;
};
