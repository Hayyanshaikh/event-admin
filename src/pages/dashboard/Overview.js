import React,{ useState } from 'react'
import * as Icons from "react-icons/tb";
import { Link } from 'react-router-dom';
import BarChart from '../../charts/BarChart.js';
import LineChart from '../../charts/LineChart.js';
import Badge from '../../components/common/Badge.js';
import Button from "../../components/common/Button.js";
import Profile from '../../components/common/Profile.js';
import {transactions,organizers,events} from '../../api/api.js';
import PageHeading from "../../components/common/PageHeading.js";
import {Income,Customers,Sales,Tickets,MonthlySale,FirstChart} from '../../api/chartData.js';

const Overview = () => {
	const incomeData = {
		labels: Income.years.map(year=> year),
		datasets: [
			{
				label: "sale",
				data: Income.data.sales.map(sale=> sale),	
	      backgroundColor: ["rgba(254,31,111,1)","rgba(212,218,228,1)"],
	      borderRadius: 4,
	      barThickness: 12,
			},
		],
	};
	const customerData = {
		labels: Customers.years.map(year=> year),
		datasets: [
			{
				label: "sale",
				data: Customers.data.sales.map(sale=> sale),	
	      backgroundColor: ["rgba(254,31,111,1)","rgba(212,218,228,1)"],
	      borderRadius: 4,
	      barThickness: 12,
			}
		],
	};
	const saleData = {
		labels: Sales.years.map(year=> year),
		datasets: [
			{
				label: "sale",
				data: Sales.data.sales.map(sale=> sale),	
	      backgroundColor: ["rgba(254,31,111,1)","rgba(212,218,228,1)"],
	      borderRadius: 4,
	      barThickness: 12,
			}
		],
	};
	const ticketData = {
		labels: Tickets.years.map(year=> year),
		datasets: [
			{
				label: "sale",
				data: Tickets.data.sales.map(sale=> sale),	
	      backgroundColor: ["rgba(254,31,111,1)","rgba(212,218,228,1)"],
	      borderRadius: 4,
	      barThickness: 12,
			}
		],
	};
	const overviewChartOptions = {
		maintainAspectRatio: false,
    scales: {
      x: {
      	grid:{
	      		display: false,
	      	},
        display: true,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
      	display: false,
      },
      tooltip:{
      	enabled: false,
      },
    },
  };

  var gain = 0;
  for (var i = 0; i < MonthlySale.data.gain.length; i++) {
  	gain += MonthlySale.data.gain[i]
  }
  var lost = 0;
  for (var i = 0; i < MonthlySale.data.lost.length; i++) {
  	lost += MonthlySale.data.lost[i]
  }
  const monthSale = {
	  labels: MonthlySale.months.map(month => month),
	  datasets: [
	    {
	      label: 'Gain',
	      data: MonthlySale.data.gain.map(add => add),
	      backgroundColor: "rgba(254,31,111,0.5)",
	      borderColor: "rgba(254,31,111,1)",
	      borderRadius: 10,
	      tension: 0.3,
	      borderWidth: 4,
	    },
	  ],
	  options:{
	  	plugins: {
	      legend: {
	      	display: false,
	      },
	    },
	    scales: {
	      x: {
	      	grid:{
	      		display: false,
	      	},
	      },
	      y: {
	      	grid: {
		        display: true,
		        color: 'rgba(243,244,246,1)',
		        lineWidth: 1,
		        drawTicks: false,
		        borderDash: [5, 5],
		      },
					min: 0,
		      max: 10,
		      font: {
	          size: 14, // Adjust the font size of the axis title
	          weight: 'bold', // Set font weight to bold
	        },
		      ticks: {
		        stepSize: 2
		      }
	      },
	    },
	  }
	};

	const firstChart = {
		labels: FirstChart.months.map(month=>month),
		datasets:[
			{
				label: "publish",
				data: FirstChart.data.publish.map(publish=> publish),
				fill: true,
	      backgroundColor: 'rgba(255,1,94,0.1)',
	      borderColor: "rgba(255,1,94,1)",
	      pointStyle: 'round',
	      borderWidth: 3,
	      showLine: true,
	      pointRadius: 1,
			}
		],
		options:{
			plugins: {
	      legend: {
	      	display: false,
	      },
	    },
			maintainAspectRatio: false,
	    scales: {
	      x: {
	      	grid:{
	      		display: false,
	      	},
	      },
	      y: {
	      	grid: {
		        display: true,
		        color: 'rgba(243,244,246,1)',
		        lineWidth: 1,
		        drawTicks: false,
		        borderDash: [5, 5],
		      },
					min: 8,
		      max: 20,
		      ticks: {
		        stepSize: 2
		      }
	      },
	    },
		}
	}
	return (
		<section className="overview">
			<PageHeading>
        <h2 className="page_heading">Welcome! John deo</h2>
        <div className="page_heading_btns hide_600">
          <Button
            label="Download List"
            className="sm outline"
            icon={<Icons.TbDownload />}
          />
        </div>
      </PageHeading>
			<div className="container">
				<div className="sec_main">
					<div className="sec_main_wrapper">
						<div className="chart_item">
							<div className="chart chart_bg this_month_sale">
								<h2 className="sub_heading">
									<span>This Month Sale</span>
									<div className="page_heading_btns">
										<Button 
											label="Months"
											className="sm"
										/>
										<Button 
											label="week"
											className="sm"
										/>
										<Button 
											label="Per day"
											className="sm"
										/>
									</div>
								</h2>

								<div className="fisrtChart">
									<LineChart chartData={firstChart} chartOptions={firstChart.options}/>
								</div>
							</div>
						</div>
						<div className="chart_item overview_charts">
							<div className="chart chart_bg half">
								<div className="content">
									<label htmlFor="" className="chart_label">monthly Income</label>
									<h2 className="chart_title">$2350</h2>
								</div>
								<div className="montly_chart">
									<BarChart chartData={incomeData} chartOptions={overviewChartOptions}/>
								</div>
							</div>
							<div className="chart chart_bg half">
								<div className="content">
									<label htmlFor="" className="chart_label">monthly Customers</label>
									<h2 className="chart_title">5264+</h2>
								</div>
								<div className="montly_chart">
									<BarChart chartData={customerData} chartOptions={overviewChartOptions}/>
								</div>
							</div>
							<div className="chart chart_bg half">
								<div className="content">
									<label htmlFor="" className="chart_label">total sale</label>
									<h2 className="chart_title">$1536</h2>
								</div>
								<div className="montly_chart">
									<BarChart chartData={saleData} chartOptions={overviewChartOptions}/>
								</div>
							</div>
							<div className="chart chart_bg half">
								<div className="content">
									<label htmlFor="" className="chart_label">total ticket</label>
									<h2 className="chart_title">5012</h2>
								</div>
								<div className="montly_chart">
									<BarChart chartData={ticketData} chartOptions={overviewChartOptions}/>
								</div>
							</div>
						</div>
						<div className="chart_item upcoming_events">
							<div className="chart this_month_sale chart_bg">
								<h2 className="sub_heading">Upcoming Events</h2>
								<ul className="upcoming_event">
									{
										events.map((event,key)=>{
											return(
                        <li key={key}>
                        	<Profile
	                          label={event.name}
	                          category={event.topic}
	                          src={event.image}
	                        />
	                        {event.status === "Published" ? (
                            <Badge label={event.status} className="light-success" />
                          ) : event.status === "Cancelled" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : event.status === "Scheduled" ? (
                            <Badge label={event.status} className="light-primary" />
                          ) : event.status === "Postponed" ? (
                            <Badge label={event.status} className="light-warning" />
                          ) : event.status === "Completed" ? (
                            <Badge label={event.status} className="light-success" />
                          ) : event.status === "Ongoing" ? (
                            <Badge label={event.status} className="light-info" />
                          ) : event.status === "Sold Out" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : event.status === "Registration Open" ? (
                            <Badge label={event.status} className="light-success" />
                          ) : event.status === "Registration Closed" ? (
                            <Badge label={event.status} className="light-danger" />
                          ) : (
                            <Badge label={event.status} className="light-warning" />
                          )}
                        </li>
											)
										})
									}
								</ul>
							</div>
							<div className="chart this_month_sale chart_bg">
								<h2 className="sub_heading">this month Sale</h2>
								<div className="event_chart">
									<LineChart chartData={monthSale} chartOptions={monthSale.options}/>
								</div>
								<div className="this_month_total_sale">
									<div className="content">
										<label className="chart_label">Total gain</label>
										<h2 className="chart_title">{gain} $</h2>
									</div>
									<div className="content">
										<label className="chart_label">Total lost</label>
										<h2 className="chart_title">{lost} $</h2>
									</div>
								</div>
							</div>
						</div>
						<div className="chart_item chart_bg">
							<h2 className="sub_heading">
								<span>Latest transactions</span>
								<Link to="/payment/transactions" className="button sm">
									<span>view all</span>
									<Icons.TbArrowRight/>
								</Link>
							</h2>		
	            <div className="manage_event_table table_responsive">
	              <table className=" striped">
	                <thead>
	                  <tr>
	                    <th>Charge id</th>
	                    <th>Payer name</th>
	                    <th>Amount</th>
	                    <th>Payment channel</th>
	                    <th>Status</th>
	                    <th>Created at</th>
	                  </tr>
	                </thead>
	                <tbody>
	                  {
	                    transactions.map((transaction, index) => (
	                      <tr key={index}>
	                        <td>{transaction.chargeId}</td>
	                        <td>
	                          <Link to={`/payment/transactions/${transaction.id}`}>
	                            {transaction.payerName}
	                          </Link>
	                        </td>
	                        <td>{transaction.amount}</td>
	                        <td>{transaction.paymentChannel}</td>
	                        <td>
	                          {transaction.status === "Completed" ? (
	                            <Badge
	                              label={transaction.status}
	                              className="light-success"
	                            />
	                          ) : transaction.status === "Refunding" ? (
	                            <Badge
	                              label={transaction.status}
	                              className="light-warning"
	                            />
	                          ) : transaction.status === "Refunded" ? (
	                            <Badge
	                              label={transaction.status}
	                              className="light-info"
	                            />
	                          ) : transaction.status === "Fraud" ? (
	                            <Badge
	                              label={transaction.status}
	                              className="light-danger"
	                            />
	                          ) : transaction.status === "Failed" ? (
	                            <Badge
	                              label={transaction.status}
	                              className="light-danger"
	                            />
	                          ) : (
	                            <Badge
	                              label={transaction.status}
	                              className="light-secondary"
	                            />
	                          )}
	                        </td>
	                        <td>{transaction.createdAt}</td>
	                      </tr>
	                    ))}
	                </tbody>
	              </table>
	            </div>
						</div>
					</div>
					<div className="sec_main_sidebar">
						<div className="sec_main_sidebar_item">
							<h2 className="sub_heading">new organizers</h2>
                <ul className="participants_list">
                  {
                  	organizers.map((participant, key) => (
                      <li key={key}>
                        <Profile
                          label={participant.name}
                          category={participant.email}
                          src={participant.image}
                        />
                      </li>
                    ))
                	}
                </ul>
						</div>
					</div>
				</div>
			</div>
		</section>		
	)
}

export default Overview;