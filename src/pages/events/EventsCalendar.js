import React, {useState} from "react";
import {Link} from 'react-router-dom';
import * as Icons from "react-icons/tb";
import {events} from '../../api/api.js';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from "../../components/common/Button.js";
import PageHeading from "../../components/common/PageHeading.js";

const EventsCalendar = () => {
  const convertedEvents = events.map((event) => ({
    id: event.id,
    title: event.name,
    start: `${event.date}`,
    image: `${event.image}`,
    location: `${event.location}`,
    price: `${event.price}`,
  }));

  const [eventDetail, setEventDetail] = useState({
  	id:'',
  	title:'',
  	start:'',
  	image:'',
  })
  const handleClick = (params) => {
  	setEventDetail({
	  	id:params.event.id,
	  	title:params.event.title,
	  	start:params.event.startStr,
	  	image:params.event.extendedProps.image,
	  	location:params.event.extendedProps.location,
	  	price:params.event.extendedProps.price,
	  })
  }
  return (
    <section>
      <PageHeading>
        <h2 className="page_heading">new Page Create</h2>
        <div className="page_heading_btns">
          <Button label="disacrd" className="sm outline" icon={<Icons.TbX />} />
          <Button label="save" className="sm" icon={<Icons.TbCheck />} />
        </div>
      </PageHeading>
      <div className="container">
        <div className="sec_main">
          <div className="sec_main_sidebar">
          	<div className="sec_main_sidebar_item">
          		<h2 className="sub_heading">Event detail</h2>
          		{
          			eventDetail.id ? (
          				<div className="calendar_event_detail">
		          			<figure className="calendar_img">
		          				<img src={eventDetail.image} alt=""/>
		          			</figure>
		          			<div className="calendar_content">
		          				<h2>{eventDetail.title}</h2>
		          				<p>{eventDetail.start}</p>
		          				<p>{eventDetail.location}</p>
		          				<p>{eventDetail.price}</p>
		          				<Link className="sm button outline" to={`/event-managment/events/manage/${eventDetail.id}`}>
		          					<span>Edit Event</span>
		          					<Icons.TbEdit/>
		          				</Link>
		          			</div>
		          		</div>
          			) : <div className="">Please choose/select a specific event from the calendar.</div>
          		}
          		
          	</div>
          </div>
          <div className="sec_main_wrapper">
            <div className="form">
              <div className="sec_main_wrapper_item">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={convertedEvents}
                eventClick={handleClick}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
