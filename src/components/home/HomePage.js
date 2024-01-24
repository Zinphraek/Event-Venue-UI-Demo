import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  BOOKING_PAGE_URL,
  EVENT_PAGE_URL,
  REVIEWS_PAGE_URL,
} from "../../utilities/constants/PagesEndpoints";
import ReviewCard from "../reviews/ReviewCard";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import { getReviews } from "../reviews/ReviewService";
import { getAllEvents } from "../event/EventServices";
import EventPreviewCard from "../event/EventPreviewCard";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const navigateTo = useNavigate();
  const [eventsData, setEventsData] = useState(EntitiesListResponseModel);
  const [reviewsData, setReviewsData] = useState(EntitiesListResponseModel);
  const reviewsSample = reviewsData.content
    .filter((review) => review.rating >= 3)
    .slice(0, 10);

  useEffect(() => {
    getReviews(setReviewsData, { sortDirection: "DESC", sortBy: "postedDate" });
    getAllEvents(setEventsData, {
      sortDirection: "DESC",
      sortBy: "postedDate",
    });
  }, []);

  return (
    <>
      <section>
        <div className="relative w-screen h-4/5 pb-2">
          <video
            src="/assets/videos/home_cover_page.mp4"
            autoPlay
            loop
            muted
            className="relative flex justify-center items-center w-full h-screen bg-cover bg-center object-cover"
          ></video>
          <div className="flex flex-col items-start m-auto">
            <div className="absolute inset-0 bg-black bg-opacity-50 h-screen" />
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-8 md:pl-16 text-left">
              <p className="text-white font-serif text-4xl md:text-6xl lg:text-8xl tracking-wider leading-snug">
                Step into Elegance,
              </p>
              <p className="text-gold font-serif text-4xl md:text-6xl lg:text-8xl tracking-wider leading-snug text-yellow-500">
                Celebrate in Style at
              </p>
              <p className="text-white font-semibold text-2xl md:text-4xl lg:text-6xl tracking-wide">
                Le Prestige Hall{" "}
                <NavLink
                  to={BOOKING_PAGE_URL}
                  className=" text-base font-semibold text-white hover:text-yellow-500 md:text-xl lg:text-2xl tracking-wide"
                >
                  <span aria-hidden="true">Get started &rarr;</span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Past Event*/}
      <section id="events-section">
        {/*Event container*/}
        <div className="container max-w-6xl mx-auto my-16 px-6 text-green-900 md:px-0">
          {/*event header*/}
          <div className="flex justify-center mb-16 md:justify-between">
            <h2 className="text-4xl text-center uppercase md:text-left md:text-5xl">
              Latest Events Held at Le Prestige Hall
            </h2>
            <button
              className="hidden px-10 py-2 my-0 font-bold tracking-widest uppercase border-2 rounded-md	border-black font-alata hover:bg-black hover:text-white md:block"
              onClick={() => navigateTo(EVENT_PAGE_URL)}
            >
              See All
            </button>
          </div>

          {/* Events container */}
          <div className="flex items-stretch overflow-x-scroll no-scrollbar py-4 px-2 space-x-4">
            {eventsData.content.slice(0, 7).map((event, index) => (
              <div
                key={index}
                className="flex-none w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
              >
                <EventPreviewCard key={`event-${event.id}`} event={event} />
              </div>
            ))}
          </div>

          {/*Bottom Button Container*/}
          <div className="flex justify-center mt-10 md:hidden">
            <button
              className="px-10 py-2 my-0 font-bold tracking-widest uppercase border-2 rounded-md	border-black font-alata hover:bg-black hover:text-white md:hidden"
              onClick={() => navigateTo(EVENT_PAGE_URL)}
            >
              See All
            </button>
          </div>
        </div>
      </section>

      {/*Reviews*/}
      <section id="events-section">
        {/*Reviews container*/}
        <div className="container max-w-6xl mx-auto my-8 px-6 text-green-900 md:px-0">
          {/*Review header*/}
          <div className="flex justify-center mb-16 md:justify-between">
            <h2 className="text-4xl text-center uppercase md:text-left md:text-5xl">
              Reviews
            </h2>
            <button
              className="hidden px-10 py-2 my-0 font-bold tracking-widest uppercase border-2 rounded-md border-black font-alata hover:bg-black hover:text-white md:block"
              onClick={() => navigateTo(REVIEWS_PAGE_URL)}
            >
              See All
            </button>
          </div>
          {/* Reviews container */}
          <div className="flex items-stretch overflow-x-scroll no-scrollbar py-4 px-2 space-x-4">
            {reviewsSample.map((review, index) => (
              <div
                key={index}
                className="flex-none w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
              >
                <ReviewCard
                  key={`review_${index}_${review.id}`}
                  review={review}
                />
              </div>
            ))}
          </div>
          {/*Bottom Button Container*/}
          <div className="flex justify-center mt-10 md:hidden">
            <button
              className="px-10 py-2 my-0 font-bold tracking-widest uppercase border-2 rounded-md	border-black font-alata hover:bg-black hover:text-white md:hidden"
              onClick={() => navigateTo(REVIEWS_PAGE_URL)}
            >
              See All
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
