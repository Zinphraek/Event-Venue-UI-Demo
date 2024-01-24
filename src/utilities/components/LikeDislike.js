import React from "react";
import PropTypes from "prop-types";
import { ThumbDown, ThumbUp } from "./Thumbs";
import { abbreviateNumber } from "../functions/Helpers";

const LikeDislike = (props) => {
	const {
		likes,
		dislikes,
		thisUserLiked,
		thisUserDisliked,
		toggleLike,
		toggleDislike,
	} = props;

	return (
		<div className="flex flex-row items-center space-x-2">
			<button className="flex items-center space-x-1" onClick={toggleLike}>
				<ThumbUp filled={thisUserLiked} />
				<span>{likes !== 0 ? abbreviateNumber(likes) : ""}</span>
			</button>
			<button className="flex items-center space-x-1" onClick={toggleDislike}>
				<ThumbDown filled={thisUserDisliked} />
				<span>{dislikes !== 0 ? abbreviateNumber(dislikes) : ""}</span>
			</button>
		</div>
	);
};

LikeDislike.propTypes = {
	likes: PropTypes.number.isRequired,
	dislikes: PropTypes.number.isRequired,
	thisUserLiked: PropTypes.bool.isRequired,
	thisUserDisliked: PropTypes.bool.isRequired,
	toggleLike: PropTypes.func.isRequired,
	toggleDislike: PropTypes.func.isRequired,
};

export default LikeDislike;
