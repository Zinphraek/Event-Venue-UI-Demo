import { useEffect, useState } from "react";
import KeycloakService from "../config/KeycloakService";
import { EventModel } from "../../utilities/models/EventModel";

const UseEventLikesDislikesStatus = (event = EventModel) => {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [thisUserLiked, setThisUserLiked] = useState(false);
	const [thisUserDisliked, setThisUserDisliked] = useState(false);

	useEffect(() => {
		const usersLiked = event?.likesDislikes?.usersLiked ?? [];
		const usersDisliked = event?.likesDislikes?.usersDisliked ?? [];

		setLikes(usersLiked?.length ?? 0);
		setDislikes(usersDisliked?.length ?? 0);
		setThisUserLiked(
			usersLiked?.includes(KeycloakService.getUserId()) ?? false
		);
		setThisUserDisliked(
			usersDisliked?.includes(KeycloakService.getUserId()) ?? false
		);
	}, [event]);

	return {
		likesDislikesStates: { likes, dislikes, thisUserLiked, thisUserDisliked },
		setLikesDislikesStates: {
			setLikes,
			setDislikes,
			setThisUserLiked,
			setThisUserDisliked,
		},
	};
};

export default UseEventLikesDislikesStatus;
