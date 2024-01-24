import React from "react";

export const EventVideoMedia = ({ eventMedia }) => {
	return (
		<div className="relative" style={{ paddingBottom: "3%" }}>
			<video
				key={eventMedia.id}
				alt={eventMedia.mediaType}
				controls
				onError={(e) => {
					console.error(`Failed to load video with error: ${e.target.error.code}`);
					console.error(e.target.error.message);
				}}
			>
				<source src={eventMedia.mediaUrl} type="video/mp4"></source>
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export const EventImageMedia = ({ eventMedia }) => {
	return (
		<div className="relative mt-0 pt-9/16">
			<img
				key={eventMedia.id}
				className="w-full"
				src={eventMedia.mediaUrl ?? "assets/images/image_placeholder_icon.png"}
				alt="event"
			/>
		</div>
	);
};
