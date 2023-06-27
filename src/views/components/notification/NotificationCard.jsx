import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../../../styles/components/notificationCard.css";
import { BsFillTrashFill } from "react-icons/bs";
import { getOneMatkul } from "../../../scripts/api/matkuls";
import { getOneDiscussion } from "../../../scripts/api/discussions";
import { Link } from "react-router-dom";
import { deleteNotification, getUserNotifications } from "../../../scripts/api/notifications";

const NotificationCard = ({
  id,
  notif_description,
  id_user,
  id_matkul,
  id_discussion,
  setNotifications,
}) => {
  const [matkulName, setMatkulName] = useState();
  const [discussionTitle, setDiscussionTitle] = useState("");

  useEffect(() => {
    const getData = async () => {
      const matkul = await getOneMatkul(id_matkul);
      setMatkulName(matkul.matkul_name);

      const discussion = await getOneDiscussion(id_discussion);
      setDiscussionTitle(discussion.discussion_title);
    };

    getData();
  }, [id_discussion, id_matkul]);

  const handleDeleteNotification = async () => {
    await deleteNotification(id).then(async () => {
      setNotifications(await getUserNotifications(id_user));
    });
  };

  return (
    <Card className="notification-card">
      <Card.Header>
        <Card.Title>
          <Link to={`/forum/${id_matkul}/diskusi/${id_discussion}`}>
            {matkulName} -{" "}
            {discussionTitle.length > 30
              ? `${discussionTitle.substring(0, 30)}...`
              : discussionTitle}
          </Link>
        </Card.Title>
        <button className="diskusi-card_icon-group btn-delete" onClick={handleDeleteNotification}>
          <BsFillTrashFill />
        </button>
      </Card.Header>
      <Card.Body>
        <Card.Text>{notif_description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
