import { UserSummaryModel } from "./UserModel";

export const EventLikesDislikes = {
	id: "",
	usersLiked: [],
	usersDisliked: [],
	eventId: "",
};

export const EventMedia = {
	id: "",
	mediaType: "",
	s3Key: "",
	mediaUrl: "",
};

export const EventModel = {
	id: "",
	title: "",
	description: "",
	likesDislikes: EventLikesDislikes,
	eventMedia: [],
	commentsCount: 0,
	postedDate: "",
};

export const CommentLikeDislikeModel = {
	id: "",
	commentId: "",
	usersLiked: [],
	usersDisliked: [],
};

export const EventCommentModel = {
	id: "",
	content: "",
	user: UserSummaryModel,
	eventId: "",
	basedCommentId: "",
	likesDislikes: CommentLikeDislikeModel,
	postedDate: "",
	edited: "",
};
