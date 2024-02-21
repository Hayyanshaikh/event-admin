import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({chartData,chartOptions,height}) => {
	return (
		<Bar data={chartData} options={chartOptions} height={height}/>
	)
}

export default BarChart