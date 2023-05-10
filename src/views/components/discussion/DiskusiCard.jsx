import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import "../../../styles/components/diskusiCard.css";
import { Link } from "react-router-dom";
import { DiskusiCardHeader } from "./DiskusiCardHeader";
import { getBasicUserInfo, getUserProfile } from "../../../scripts/api/users";
import { getAllComments } from "../../../scripts/api/comments";

const DiskusiCard = ({
  id,
  discussion_title,
  discussion_description,
  discussion_status,
  id_matkul,
  id_user,
  createdAt,
}) => {
  const [user, setUser] = useState(getUserProfile());
  const [commentsLength, setCommentsLength] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getBasicUserInfo(id_user);
      const comment = await getAllComments(id);

      setUser(user);
      setCommentsLength(comment.length);
    };

    getUserInfo();
  }, [id_user, id_matkul, id]);

  return (
    <div className="diskusi-card card-hover">
      <Link to={`/forum/${id_matkul}/diskusi/${id}`}>
        <DiskusiCardHeader {...user} discussion_status={discussion_status} createdAt={createdAt} />
        <div className="diskusi-card_content">
          <h3>{discussion_title}</h3>
          <p>{discussion_description}</p>
        </div>
      </Link>
      <div className="diskusi-card_footer">
        <div className="diskusi-card_icon-group">
          <BsFillChatDotsFill />
          <p>{commentsLength} Pembahasan</p>
        </div>
      </div>
    </div>
  );
};

export default DiskusiCard;
