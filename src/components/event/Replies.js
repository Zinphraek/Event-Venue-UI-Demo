import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import EventComment from "./EventComment";
import { getReplies } from "./EventServices";

const Replies = (props) => {
  const { basedCommentId, eventId } = props;
  const [replies, setReplies] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getReplies(setReplies, eventId, basedCommentId, setRefresh);
  }, [eventId, basedCommentId, refresh]);
  return (
    <div className="space-y-2 ml-5">
      {replies
        ?.slice()
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .map((reply) => (
          <EventComment key={reply.id} comment={reply} />
        ))}
    </div>
  );
};

Replies.propTypes = {
  basedCommentId: PropTypes.number.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default Replies;
