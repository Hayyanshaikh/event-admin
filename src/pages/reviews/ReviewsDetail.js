import React from "react";
import * as Icons from "react-icons/tb";
import { useParams } from "react-router-dom";
import Badge from "../../components/common/Badge.js";
import Rating from "../../components/common/Rating.js";
import Button from "../../components/common/Button.js";
import PageHeading from "../../components/common/PageHeading.js";
import { reviews } from "../../api/api.js";

const ReviewsDetail = () => {
  const { reviewid } = useParams();

  const review = reviews.find((review) => {
    return review.id === reviewid;
  });

  return (
    <section className="manage_event">
      <PageHeading>
        <h2 className="page_heading">{review.name && review.name}</h2>
        <div className="page_heading_btns">
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
            <div className="sec_main_wrapper_item">
              <h2 className="sub_heading">Review</h2>
              <div className="review">
                <div className="review_head">
                  <Rating value={review.review && review.review} />
                  {review.status && review.status === "published" ? (
                    <Badge
                      label={review.status && review.status}
                      className="light-success"
                    />
                  ) : (
                    <Badge
                      label={review.status && review.status}
                      className="light-warning"
                    />
                  )}
                </div>
                <div className="review_body">
                  <p className="review_detail_text">
                    {review.text && review.text}
                  </p>
                  <p className="review_detail_text">
                    <Icons.TbClockHour3 />
                    {review.date && review.date}
                  </p>
                </div>
                <div className="review_footer">
                  <div className="review_likes">
                    <div className="likes">
                      <Icons.TbThumbUp />
                      {review.likes}
                    </div>
                    <div className="likes">
                      <Icons.TbThumbDown />
                      {review.dislikes}
                    </div>
                  </div>

                  <Button
                    label="delete"
                    className="sm outline"
                    icon={<Icons.TbTrash />}
                    // Handle delete action here
                  />
                  {review.status && review.status === "published" ? (
                    <Button
                      label="unpublished"
                      className="sm"
                      // Handle unpublish action here
                    />
                  ) : (
                    <Button
                      label="published"
                      className="sm"
                      // Handle publish action here
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sec_main_sidebar">
            <div className="sec_main_sidebar_item">
              <h2 className="sub_heading">Organizer Summary</h2>
              <div className="user_summary"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsDetail;