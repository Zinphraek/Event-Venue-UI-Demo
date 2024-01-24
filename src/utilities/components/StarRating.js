import React from "react";
import Star from "./Star";

/**
 * The component to display a star rating.
 * @param {number} rating  The rating to display.
 * @returns The component to display a set of 5 rating stars.
 */
const StarRating = ({ rating, size }) => {
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 >= 0.5 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStar;

	return (
		<div className="flex">
			{[...Array(fullStars)].map((_, i) => (
				<Star key={i} type="filled" size={size} />
			))}
			{halfStar ? <Star type="half" /> : null}
			{[...Array(emptyStars)].map((_, i) => (
				<Star key={i + fullStars + halfStar} type="empty" size={size} />
			))}
		</div>
	);
};

export default StarRating;
