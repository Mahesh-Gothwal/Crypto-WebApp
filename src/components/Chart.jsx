import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  PointElement,
  Title,
  LineElement,
  Tooltip,
  Legend
);

const Chart = ({arr=[], currency, days}) => {

    const prices = [12,34,48]
    const date = ["12/9/78",",54/7/39","6/8/23"]

    const data = {

    }

  return <Line
  options={{
    responsive: true
  }}
  data={{
    labels:date,
    datasets:[{
        label:`Prices in ${currency}`,
        data:prices,borderColor:"rgb(255,99,132)",
        backgroundColor:"rgba(255,99,132, 0.5)"
    }]
  }}/>
};

export default Chart;
