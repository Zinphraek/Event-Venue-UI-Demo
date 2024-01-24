import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import EventComment from "./EventComment";
import { useUserRefresh } from "../user/UserProvider";
import { IMAGE } from "../../utilities/constants/MediaType";
import { EventImageMedia, EventVideoMedia } from "./EventMedia";
import {
  EventCommentModel,
  EventModel,
} from "../../utilities/models/EventModel";
import CustomToast from "../../utilities/components/CustomToast";
import {
  createEventComment,
  getCommentsByEventId,
  getEventById,
  getMediaByEventId,
  likeOrDislikeEvent,
} from "./EventServices";
import { Carousel } from "react-responsive-carousel";
import KeycloakService from "../config/KeycloakService";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThumbUp, ThumbDown } from "../../utilities/components/Thumbs";
import { abbreviateNumber } from "../../utilities/functions/Helpers";
import LocalizedModal from "../../utilities/components/LocalizedModal";
import Modal from "../../utilities/components/Modal";
import UseEventLikesDislikesStatus from "./UseEventLikesDislikesStatus";
import { ToastContainer } from "react-toastify";

/**
 * A card that displays an event.
 * @param {object} event The event to be displayed.
 * @returns An event card element.
 */
const EventCard = () => {
  const { id } = useParams();
  const [eventMedia, setEventMedia] = useState([]);
  const setFetchUserFlag = useUserRefresh();
  const [event, setEvent] = useState(EventModel);
  const [showActionButtons, setShowActionButton] = useState(false);
  const [comment, setComment] = useState(EventCommentModel); //New comment posted by user
  const [showComments, setShowComments] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [comments, setComments] = useState([]);
  const [showLikeDialog, setShowLikeDialog] = useState(false);
  const [showDislikeDialog, setShowDislikeDialog] = useState(false);
  const {
    likesDislikesStates: { likes, dislikes, thisUserLiked, thisUserDisliked },
    setLikesDislikesStates: {
      setLikes,
      setDislikes,
      setThisUserLiked,
      setThisUserDisliked,
    },
  } = UseEventLikesDislikesStatus(event);

  const likeAndDislikeMessage = "Log in to make your opinion count.";

  const likesDislikesId = event?.likesDislikes?.id ?? null;

  const singIn = async () => {
    await KeycloakService.doLogin(setFetchUserFlag);
  };

  const toggleActionButtons = async () => {
    if (!KeycloakService.isLoggedIn()) {
      await singIn();
    }
    setShowActionButton(true);
  };

  const commentChangeHandler = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  const cancelComment = () => {
    setComment(EventCommentModel);
    setShowActionButton((prev) => !prev);
  };

  const submitComment = async () => {
    if (comment.content.length > 2000) {
      CustomToast("Comment must be less than 2000 characters.", "error");
      return;
    }
    const newComment = { ...comment };
    newComment.eventId = event.id;
    newComment.user = {
      userId: KeycloakService.getUserId(),
      firstName: KeycloakService.getUserFirstName(),
      lastName: KeycloakService.getUserLastName(),
    };
    newComment.postedDate = new Date();
    await createEventComment(newComment, setRefresh);
    setComment(EventCommentModel);
  };

  const toggleLike = async () => {
    if (KeycloakService.isLoggedIn()) {
      if (thisUserLiked) {
        setThisUserLiked(false);
        setLikes((prev) => prev - 1);
        setThisUserDisliked(false);
        await likeOrDislikeEvent(
          likesDislikesId,
          KeycloakService.getUserId(),
          "unLike",
          event.id
        );
      } else {
        setThisUserLiked(true);
        setLikes((prev) => prev + 1);
        thisUserDisliked && setDislikes((prev) => prev - 1);
        setThisUserDisliked(false);
        await likeOrDislikeEvent(
          likesDislikesId,
          KeycloakService.getUserId(),
          "like",
          event.id
        );
      }
    } else {
      setShowDislikeDialog(false);
      setShowLikeDialog(true);
    }
  };

  const toggleDislike = async () => {
    if (KeycloakService.isLoggedIn()) {
      if (thisUserDisliked) {
        setThisUserDisliked(false);
        setDislikes((prev) => prev - 1);
        setThisUserLiked(false);
        await likeOrDislikeEvent(
          likesDislikesId,
          KeycloakService.getUserId(),
          "unDislike",
          event.id
        );
      } else {
        setThisUserDisliked(true);
        setDislikes((prev) => prev + 1);
        thisUserLiked && setLikes((prev) => prev - 1);
        setThisUserLiked(false);
        await likeOrDislikeEvent(
          likesDislikesId,
          KeycloakService.getUserId(),
          "dislike",
          event.id
        );
      }
    } else {
      setShowLikeDialog(false);
      setShowDislikeDialog(true);
    }
  };

  useEffect(() => {
    getEventById(setEvent, id);
    getMediaByEventId(setEventMedia, id);
    getCommentsByEventId(setComments, id);
  }, [id, refresh]);

  return (
    <div className="bg-gray-300 min-h-screen w-screen mx-auto p-0">
      <div className="min-w-full mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mb-0">
        {/*The event media*/}
        <div className="w-full">
          <Carousel showThumbs={false} dynamicHeight={true} emulateTouch={true}>
            {eventMedia.map((media) => (
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
          {/*The like and dislike buttons*/}
          <div className="grid grid-cols-2 gap-0 items-start justify-start bg-gray-200 rounded-2xl py-1 m-4">
            <div>
              <div className="w-full rounded-l-2xl px-3 first-letter:rounded-full transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 hover:scale-110 duration-50">
                <button
                  className="flex flex-row relative items-center space-x-1 w-full"
                  onClick={toggleLike}
                >
                  <ThumbUp filled={thisUserLiked} />
                  <span>{likes !== 0 ? abbreviateNumber(likes) : ""}</span>
                </button>
              </div>
              {/*The like dialog*/}
              <Modal isOpen={showLikeDialog} onClose={setShowLikeDialog}>
                <LocalizedModal
                  setOpen={setShowLikeDialog}
                  title="Like this event?"
                  message={likeAndDislikeMessage}
                  actionText="Log in"
                  cancelText="Go back"
                  actionHandler={singIn}
                />
              </Modal>
            </div>
            <div className="relative w-full border-l-1 border-gray-400">
              <div>
                <div className="w-full rounded-r-2xl px-3 first-letter:rounded-full transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 hover:scale-110 duration-50">
                  <button
                    className="flex flex-row relative items-center space-x-1 w-full"
                    onClick={toggleDislike}
                  >
                    <ThumbDown filled={thisUserDisliked} />
                    <span>
                      {dislikes !== 0 ? abbreviateNumber(dislikes) : ""}
                    </span>
                  </button>
                </div>
                {/*The dislike dialog*/}
                <Modal
                  isOpen={showDislikeDialog}
                  onClose={setShowDislikeDialog}
                >
                  <LocalizedModal
                    setOpen={setShowDislikeDialog}
                    title="Dislike this event?"
                    message={likeAndDislikeMessage}
                    actionText="Log in"
                    cancelText="Go back"
                    actionHandler={singIn}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-base line-clamp-3 m-4">
          {event.description}
        </p>

        {/*The comments size and the sort by button*/}
        <div className="flex flex-row gap-6 mx-4">
          <div>{`${event?.commentsCount ?? 0} ${
            event?.commentsCount > 1 ? "Comments" : "Comment"
          }`}</div>
          <div>Sort by</div>
        </div>
        {/*The comment section*/}
        <div className="flex flex-col mx-4">
          <input
            type="text"
            maxLength={2000}
            value={comment.content}
            onChange={commentChangeHandler}
            onClick={toggleActionButtons}
            placeholder="Add a comment..."
            className="border-gray-500 border-b-2 bg-transparent focus:outline-none"
          />
          {showActionButtons && (
            <div className="flex flex-row gap-4 items-end justify-end my-2">
              <button
                className="text-sm text-white font-bold pb-1.5 pt-1 w-1/8 h-8 rounded-full px-3 bg-slate-700"
                onClick={cancelComment}
              >
                Cancel
              </button>
              <button
                disabled={comment.content.trim() === ""}
                onClick={submitComment}
                className={`${
                  comment.content.trim() === ""
                    ? "bg-slate-400"
                    : "bg-blue-700 text-white transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 duration-50"
                } text-sm font-bold pb-1.5 pt-1 w-1/8 h-8 rounded-full px-3`}
              >
                Comment
              </button>
            </div>
          )}
        </div>
        {/*The comments section*/}
        <div className="m-4">
          {comments && comments.length > 0 && (
            <button
              className="text-blue-500 text-sm"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? "Hide comments" : "View comments"}
            </button>
          )}
        </div>
        <>
          {showComments && (
            <div className="space-y-4 bg-gray-200 pb-2">
              {comments
                ?.sort(
                  (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
                )
                .map((comment) => (
                  <EventComment key={comment.id} comment={comment} />
                ))}
            </div>
          )}
        </>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventCard;
