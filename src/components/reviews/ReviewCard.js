import React from "react";
import PropTypes from "prop-types";
import StarRating from "../../utilities/components/StarRating";

const ReviewCard = (prop) => {
	const { review } = prop;

	return (
		<div
			id={`review-${review.id}`}
			className="flex flex-col h-full max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
		>
			{/*Profile picture and name*/}
			<div className="flex z-10 space-x-4 py-2 px-2 bg-gray-400 text-white rounded-t">
				<img
					src={
						review.user?.profilePictureUrl ?? "assets/images/icon-profile.png"
					}
					alt="profile"
					className="w-10 h-10 rounded-full ring-1 ring-purple-300"
				/>
				<div className="text-sm">
					<h4 className="opacity-90">
						{review.user.firstName} {review.user.lastName}
					</h4>
					{/*----- Rating -----*/}
					<div className="my-1">
						<StarRating rating={review.rating} size={4} />
					</div>
				</div>
			</div>
			{/*----- Title -----*/}
			<h3 className="text-lg font-medium font-alata mx-4 mt-2">
				{review.title}
			</h3>
			{/*----- Comment -----*/}
			<div className="py-4 flex-grow items-stretch mx-4">
				<p className="relative italic text-gray-700 text-base z-10 md:line-clamp-6 line-clamp-4">
					{review.comment}
				</p>
			</div>
		</div>
	);
};

ReviewCard.propTypes = {
	review: PropTypes.object.isRequired,
};

export default ReviewCard;
