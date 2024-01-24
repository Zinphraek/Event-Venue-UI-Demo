import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IMAGE } from "../../utilities/constants/MediaType";
import { EventImageMedia, EventVideoMedia } from "./EventMedia";
import { Carousel } from "react-responsive-carousel";
import { EVENT_PAGE_URL } from "../../utilities/constants/PagesEndpoints";
import { getMediaByEventId } from "./EventServices";

/**
 * A card that displays an event preview.
 * @param {object} event The event to be displayed.
 * @returns A preview event card element.
 */
const EventPreviewCard = ({ event }) => {
  const navigateTo = useNavigate();
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    getMediaByEventId(setMediaData, event.id);
  }, [event.id]);
  return (
    <div
      className="focus:outline-none h-full w-full"
      onClick={() => navigateTo(`${EVENT_PAGE_URL}/${event.id}`)}
    >
      <div className="max-w-md mx-auto h-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl pb-0 mt-0">
        {/*The event media*/}
        <div className="w-full h-[70%]">
          <Carousel showThumbs={false} dynamicHeight={true} emulateTouch={true}>
            {mediaData.map((media) => (
              <div
                key={`media-${media.id}`}
                className="flex flex-col justify-center items-center mb-3 mt-0"
              >
                {media?.type.startsWith(IMAGE) ? (
                  <EventImageMedia eventMedia={media} />
                ) : (
                  <EventVideoMedia eventMedia={media} />
                )}
              </div>
            ))}
          </Carousel>
        </div>
        {/*The event title*/}
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl font-bold mb-2 mx-4">{event.title}</div>
        </div>
        <p className="px-6 py-4 text-gray-700 text-base line-clamp-1 m-4">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventPreviewCard;
