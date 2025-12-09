import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartMoment: FC = () => {
  // Nyt tulokset tulee Redixin kautta
  const moments = useSelector((state: any) => state.moment.moment);
  return <Line data={moments.data} options={moments.options} />;
};

export default LineChartMoment;
