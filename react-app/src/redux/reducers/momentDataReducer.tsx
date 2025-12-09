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
        label: "M [kNm]",
        data: [],
        backgroundColor: "#ffe5e5",
        borderColor: "red",
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
        text: "Taivutusmomentti-käyrä",
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

export const momentDataReducer = (state: any = intialState, action: any) => {
  if (action.type === ActionTypes.ADD_MOMENT_DATA) {
    return {
      ...state,
      moment: { ...state.moment, ...action.payload },
    };
  }

  return state;
};
