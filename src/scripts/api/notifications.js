import axios from "axios";
import { getAccessToken } from "./auth";
import { toast } from "react-toastify";

// const BASE_URL = "http://localhost:8000/api/notifications";
const BASE_URL = "https://forum-diskusiback-end-production.up.railway.app/api/notifications";

const getUserNotifications = async (id) => {
  try {
    const commentList = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });

    return commentList.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (notif_description, id_commentUser, id_matkul, id_discussion) => {
  try {
    await axios.post(
      `${BASE_URL}/create`,
      {
        notif_description: notif_description,
        id_user: id_commentUser,
        id_matkul: id_matkul,
        id_discussion: id_discussion,
      },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteNotification = async (id_notification) => {
  try {
    await axios
      .delete(`${BASE_URL}/${id_notification}/delete`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(() => {
        toast.success("Notifikasi Berhasil Dihapus!");
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllUserNotifications = async () => {
  try {
    await axios
      .delete(`${BASE_URL}/delete-all`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(() => {
        toast.success("Semua Notifikasi Berhasil Dihapus!");
      });
  } catch (error) {
    console.log(error);
  }
};

export { getUserNotifications, createNotification, deleteNotification, deleteAllUserNotifications };
