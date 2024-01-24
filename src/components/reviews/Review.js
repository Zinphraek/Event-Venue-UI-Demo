import React from "react";
import StarRating from "../../utilities/components/StarRating";
import { formatDateForDetailsView } from "../../utilities/functions/Helpers";

/**
 * The review component.
 * @param {object} props - The props passed to the component.
 * @returns - The review component.
 * @see - src\components\reviews\Reviews.js
 */
const Review = ({ review }) => {
	return (
		<div className="flex flex-col my-4 w-full">
			<div className="flex flex-row justify-start my-4">
				<img
					className="w-12 h-12 rounded-full ring-1 ring-white"
					src={
						review.user?.profilePictureUrl ?? "assets/images/icon-profile.png"
					}
					alt="profile"
				/>
				<div className="flex flex-col mx-4">
					<h3 className="text-md font-normal font-alata">
						{review.user.firstName} {review.user.lastName}
					</h3>
					<div className="flex flex-row items-start">
						<div className="my-1">
							<StarRating rating={review.rating} size={4} />
						</div>
						<p className="opacity-60 ml-2 text-sm my-1">Verified Customer</p>
					</div>
				</div>
			</div>
			<div className="relative">
				<h3 className="text-lg font-medium font-alata mb-1">{review.title}</h3>
				<p className="text-gray-700 italic">{review.comment}</p>
			</div>
			<div className="flex flex-row justify-between my-2 py-1">
				<p className="text-gray-700 mr-2 text-sm">
					Posted on: {formatDateForDetailsView(review.postedDate)}
				</p>
				{review.lastEditedDate && (
					<p className="text-gray-700 ml-2 border-l-2 border-gray-500">
						Last Edited: {formatDateForDetailsView(review.lastEditedDate)}
					</p>
				)}
			</div>
		</div>
	);
};

export default Review;
