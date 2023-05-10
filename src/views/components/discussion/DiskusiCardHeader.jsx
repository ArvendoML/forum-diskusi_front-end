import React from "react";
import showFormattedDate from "../../../scripts/showFormattedDate";
import { useEffect } from "react";
import fetchProfileImage from "../../../scripts/fetchProfileImage";
import { useState } from "react";

const DiskusiCardHeader = ({
  user_name,
  user_imageUrl,
  discussion_status,
  checkOwner,
  createdAt,
}) => {
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    const getData = async () => {
      const image = await fetchProfileImage(user_imageUrl);
      setUserImageUrl(image);
    };

    getData();
  }, [user_imageUrl]);

  let status;
  if (discussion_status && !checkOwner) {
    status = <p className="diskusi-card_header-status">Selesai</p>;
  }

  return (
    <div className="diskusi-card_header">
      <div className="diskusi-card_header-left">
        <div className="diskusi-card_header-image">
          <img src={userImageUrl} alt={`${user_name} Avatar`} />
        </div>
        <p>
          {user_name} - {showFormattedDate(createdAt)}
        </p>
      </div>
      {status}
    </div>
  );
};

const DiskusiCardHeaderNewComment = ({ user_name, user_imageUrl }) => {
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    const getData = async () => {
      await fetchProfileImage(user_imageUrl).then((res) => {
        setUserImageUrl(res);
      });
    };

    getData();
  }, [user_imageUrl]);

  return (
    <div className="diskusi-card_header diskusi-card_header-new-comment">
      <div className="diskusi-card_header-image">
        <img src={userImageUrl} alt={`${user_name} Avatar`} />
      </div>
      <p>{user_name}</p>
    </div>
  );
};

export { DiskusiCardHeader, DiskusiCardHeaderNewComment };
