import React, { useEffect, useState } from "react";
import NotificationCard from "../components/notification/NotificationCard";
import "../../styles/pages/notificationPage.css";
import { getDataFromToken } from "../../scripts/api/auth";
import { deleteAllUserNotifications, getUserNotifications } from "../../scripts/api/notifications";
import Paginate from "../components/paginate/Paginate";

const NotificationPage = ({ notifications, setNotifications }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const userData = await getDataFromToken();
      setUserId(userData.id);

      const notifications = await getUserNotifications(userData.id);
      setNotifications(notifications);

      setIsLoading(false);
    };

    getData();
  }, [setNotifications]);

  const handleOnClickDeleteAllNotifications = async () => {
    await deleteAllUserNotifications().then(async () => {
      const notifications = await getUserNotifications(userId.id);
      setNotifications(notifications);
    });
  };

  const renderNotifications = ({ currentItems }) => {
    if (notifications.length === 0) {
      return <p>Notifikasi Kosong!</p>;
    }
    return (
      <>
        {currentItems.map((notification, i) => (
          <NotificationCard key={i} {...notification} setNotifications={setNotifications} />
        ))}
      </>
    );
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <section id="notificationPage">
      <div className="notificationPage-header">
        <h1>Notifikasi</h1>
        <button
          className="btn-delete-all-notifications"
          onClick={handleOnClickDeleteAllNotifications}
        >
          Hapus Semua
        </button>
      </div>
      <hr />
      <div>
        <Paginate
          Items={renderNotifications}
          data={notifications}
          itemsPerPage={8}
          listClassName={"card-list"}
        />
      </div>
    </section>
  );
};

export default NotificationPage;
