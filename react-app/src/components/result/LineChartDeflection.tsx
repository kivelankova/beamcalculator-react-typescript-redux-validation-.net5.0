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

const LineChartDeflection: FC = () => {
  const deflections = useSelector((state: any) => state.deflection.deflection);
  return <Line data={deflections.data} options={deflections.options} />;
};

export default LineChartDeflection;
