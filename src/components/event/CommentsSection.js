import React from "react";
import EventComment from "./EventComment";

const CommentsSection = () => {
	const comments = [
		{
			userId: "User1",
			time: "2 hours ago",
			content: "This video is great!",
			likes: 5,
			dislikes: 1,
			replies: [
				{
					userId: "User2",
					time: "1 hour ago",
					content: "I agree!",
					likesDislikes: {
						likes: 2,
						dislikes: 0,
					},
				},
				{
					userId: "User3",
					time: "45 minutes ago",
					content: "Me too!",
					likes: 1,
					dislikes: 0,
				},
			],
		},
		{
			userId: "User4",
			time: "3 hours ago",
			content: "Really informative, thanks for sharing!",
			likes: 8,
			dislikes: 1,
		},
		{
			userId: "User5",
			time: "4 hours ago",
			content: "Could you make a video on XYZ topic next?",
			likes: 7,
			dislikes: 0,
			replies: [
				{
					userId: "User1",
					time: "3 hours ago",
					content: "Yes, I would love to see that!",
					likes: 4,
					dislikes: 0,
				},
				{
					userId: "VideoUploader",
					time: "1 hour ago",
					content: "Good suggestion, I'll consider it for my next video.",
					likes: 6,
					dislikes: 0,
				},
			],
		},
	];

	return (
		<div className="space-y-4 bg-yellow-800">
			{comments.map((content, index) => (
				<EventComment key={index} {...content} />
			))}
		</div>
	);
};

export default CommentsSection;
