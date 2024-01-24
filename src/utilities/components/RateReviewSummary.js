import React from "react";
import Star from "./Star";

/**
 * The component to display a summary of a single rate level.
 * @param {object} props  The props passed to the component.
 * @returns The component to display a summary of a single rate level.
 */
const RateReviewSummary = ({ rating, percentage }) => {
	const floorPercentage = Math.floor(percentage);
	const displayPercentage =
		floorPercentage.toFixed(2) !== percentage ? percentage : floorPercentage;

	return (
		<div className="grid grid-cols-11 gap-2 pl-0 ml-0">
			<div className="flex col-span-10 flow-row space-x-3 mx-0 px-0">
				<div>
					<div className="col-span-1 font-semibold">{rating}</div>
				</div>
				<div className="col-span-1">
					<Star type="filled" />
				</div>
				<div className="col-span-8">
					<progress
						className="progress-bar w-full h-2 rounded mx-0 px-0"
						max="100"
						value={percentage}
					></progress>
				</div>
			</div>
			<div className="col-span-1 font-semibold">{displayPercentage}%</div>
		</div>
	);
};

export default RateReviewSummary;
