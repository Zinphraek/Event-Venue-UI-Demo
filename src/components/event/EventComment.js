import React, { useState, useEffect } from "react";
import Replies from "./Replies";
import PropTypes from "prop-types";
import LikeDislike from "../../utilities/components/LikeDislike";
import { EventCommentModel } from "../../utilities/models/EventModel";
import CustomToast from "../../utilities/components/CustomToast";
import {
	createEventComment,
	getReplies,
	likeOrDislikeComment,
} from "./EventServices";
import KeycloakService from "../config/KeycloakService";
import { formatDateForComment } from "../../utilities/functions/Helpers";
import { useUserRefresh } from "../user/UserProvider";

/**
 * A card that displays an event comment.
 * @param {object} comment The comment to be displayed.
 * @returns An event comment card element.
 */
const EventComment = ({ comment }) => {
	const setFetchUserFlag = useUserRefresh();
	const [replies, setReplies] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [showReplyField, setShowReplyField] = useState(false);
	const [reply, setReply] = useState(EventCommentModel);
	const likesDislikesId = comment?.likesDislikes?.id ?? null;
	const usersLiked = comment?.likesDislikes?.usersLiked;
	const usersDisliked = comment?.likesDislikes?.usersDisliked;
	const [likes, setLikes] = useState(usersLiked?.length ?? 0);
	const [dislikes, setDislikes] = useState(usersDisliked?.length ?? 0);
	const [thisUserLiked, setThisUserLiked] = useState(
		usersLiked?.includes(KeycloakService.getUserId()) ?? false
	);
	const [thisUserDisliked, setThisUserDisliked] = useState(
		usersDisliked?.includes(KeycloakService.getUserId()) ?? false
	);

	const replyChangeHandler = (e) => {
		setReply({ ...reply, content: e.target.value });
	};

	const cancelReplyHandler = () => {
		setShowReplyField(false);
		setReply(EventCommentModel);
	};

	const replySubmitHandler = async () => {
		if (reply.content.length > 2000) {
			CustomToast("Comment must be less than 2000 characters.", "error");
			return;
		}
		const newReply = { ...reply };
		newReply.eventId = comment.eventId;
		newReply.user = {
			userId: KeycloakService.getUserId(),
			firstName: KeycloakService.getUserFirstName(),
			lastName: KeycloakService.getUserLastName(),
		};
		newReply.basedCommentId = comment.id;
		newReply.postedDate = new Date();
		await createEventComment(newReply, setRefresh);
		setReply(EventCommentModel);
	};

	const singIn = async () => {
		await KeycloakService.doLogin(setFetchUserFlag);
	};

	const toggleReplyField = async (e) => {
		if (!KeycloakService.isLoggedIn()) {
			await singIn();
		}
		e.target.textContent === "Reply"
			? setShowReplyField(true)
			: cancelReplyHandler();
	};

	const toggleLike = async () => {
		if (!KeycloakService.isLoggedIn()) {
			await singIn();
		}
		if (thisUserLiked) {
			setThisUserLiked(false);
			setLikes((prev) => prev - 1);
			setThisUserDisliked(false);
			await likeOrDislikeComment(
				likesDislikesId,
				comment.user.userId,
				"unLike",
				comment.id,
				comment.eventId
			);
		} else {
			setThisUserLiked(true);
			setLikes((prev) => prev + 1);
			thisUserDisliked && setDislikes((prev) => prev - 1);
			setThisUserDisliked(false);
			await likeOrDislikeComment(
				likesDislikesId,
				comment.user.userId,
				"like",
				comment.id,
				comment.eventId
			);
		}
	};

	const toggleDislike = async () => {
		if (!KeycloakService.isLoggedIn()) {
			await singIn();
		}
		if (thisUserDisliked) {
			setThisUserDisliked(false);
			setDislikes((prev) => prev - 1);
			setThisUserLiked(false);
			await likeOrDislikeComment(
				likesDislikesId,
				comment.user.userId,
				"unDislike",
				comment.id,
				comment.eventId
			);
		} else {
			setThisUserDisliked(true);
			setDislikes((prev) => prev + 1);
			thisUserLiked && setLikes((prev) => prev - 1);
			setThisUserLiked(false);
			await likeOrDislikeComment(
				likesDislikesId,
				comment.user.userId,
				"dislike",
				comment.id,
				comment.eventId
			);
		}
	};

	useEffect(() => {
		getReplies(setReplies, comment.eventId, comment.id);
	}, [comment.eventId, comment.id, refresh]);

	return (
		<div>
			<div className="flex items-start space-x-2 p-3">
				<img
					className="h-10 w-10 rounded-full"
					src={
						comment?.user?.profilePictureUrl ??
						"/assets/images/icon-profile.png"
					}
					alt={comment?.user?.userId}
				/>
				<div className="space-y-1 w-full">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-1">
							<h4 className="font-bold">
								{comment?.user?.firstName ?? "FirstName"}{" "}
								{comment?.user?.lastName?.charAt(0).toUpperCase() ?? "L"}
							</h4>
							<p className="text-gray-500 text-sm">
								{comment?.postedDate
									? formatDateForComment(comment?.postedDate)
									: ""}
							</p>
						</div>
					</div>
					<p>{comment?.content ?? ""}</p>
					<div className="flex flex-row gap-4">
						<LikeDislike
							likes={likes}
							dislikes={dislikes}
							toggleLike={toggleLike}
							toggleDislike={toggleDislike}
							thisUserLiked={thisUserLiked}
							thisUserDisliked={thisUserDisliked}
						/>
						<button
							onClick={toggleReplyField}
							className="bg-slate-600 text-xs text-white font-bold pb-1.5 pt-1 w-1/8 h-8 rounded-full px-3 py-1 transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 duration-50 hover:bg-blue-700"
						>
							Reply
						</button>
					</div>
					{/*The comment section*/}
					<div>
						{showReplyField && (
							<div className="flex flex-col">
								<input
									type="text"
									value={reply.content}
									onChange={replyChangeHandler}
									placeholder="Add a reply..."
									className="border-gray-500 border-b-2 bg-transparent focus:outline-none focus:border-white"
								/>
								<div className="flex flex-row gap-4 items-end justify-end my-2">
									<button
										onClick={toggleReplyField}
										className="text-sm text-white bg-gray-400 font-bold pb-1.5 pt-1 w-1/8 h-8 rounded-full px-3 hover:bg-slate-700"
									>
										Cancel
									</button>
									<button
										disabled={reply.content.trim() === ""}
										onClick={replySubmitHandler}
										className={`${
											reply.content.trim() === ""
												? "bg-slate-400"
												: "bg-blue-700 text-white transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 duration-50"
										} text-sm font-bold pb-1.5 pt-1 w-1/8 h-8 rounded-full px-3`}
									>
										Submit
									</button>
								</div>
							</div>
						)}
					</div>
					{replies && replies.length > 0 && (
						<button
							className="text-blue-500 text-sm"
							onClick={() => setShowReplies(!showReplies)}
						>
							{showReplies ? "Hide Replies" : "View Replies"}
						</button>
					)}
				</div>
			</div>
			{showReplies && replies && (
				<Replies basedCommentId={comment.id} eventId={comment.eventId} />
			)}
		</div>
	);
};

EventComment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default EventComment;
