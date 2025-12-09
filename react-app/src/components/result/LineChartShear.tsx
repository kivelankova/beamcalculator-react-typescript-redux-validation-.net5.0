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

const LineChartShear: FC = () => {
  const shears = useSelector((state: any) => state.shear.shear);
  return <Line data={shears.data} options={shears.options} />;
};

export default LineChartShear;
