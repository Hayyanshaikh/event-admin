import React from 'react'
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const RadarChart = ({chartData,chartOptions}) => {
	return (
		<Radar data={chartData} options={chartOptions}/>
	)
}

export default RadarChart