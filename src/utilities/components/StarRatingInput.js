import React, { useState } from "react";
import Star from "./Star";

const StarRatingInput = ({ value, onChange }) => {
	const [hoverValue, setHoverValue] = useState(undefined);
	const stars = Array(5).fill(0);

	const handleClick = (number) => {
		onChange(number);
	};

	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};

	return (
		<div style={{ display: "flex" }}>
			{stars.map((_, index) => {
				const starValue = index + 1;

				return (
					<button
						key={starValue}
						type="button"
						style={{ background: "none", border: "none" }}
						onClick={() => handleClick(starValue)}
						onMouseOver={() => handleMouseOver(starValue)}
						onMouseLeave={handleMouseLeave}
					>
						<Star
							type={starValue <= (hoverValue || value) ? "filled" : "empty"}
						/>
					</button>
				);
			})}
		</div>
	);
};

export default StarRatingInput;
