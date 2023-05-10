import axios from "axios";
import { getAccessToken } from "./auth";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api/discussions";

const getDiscussionImages = async (id_discussion) => {
  try {
    const discussionImages = await axios.get(`${BASE_URL}/${id_discussion}/images`);

    return discussionImages.data.data;
  } catch (error) {
    console.log(error);
  }
};

const addDiscussionImage = async (id_discussion, discussion_image) => {
  try {
    await axios.post(
      `${BASE_URL}/${id_discussion}/images/create`,
      {
        discussion_image: discussion_image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getAccessToken(),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteDiscussionImage = async (id_discussionImage) => {
  try {
    await axios
      .delete(`${BASE_URL}/images/${id_discussionImage}/delete`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(() => {
        toast.success("Foto diskusi berhasi dihapus!");
      })
      .catch(() => {
        toast.error("Foto gagal dihapus!");
      });
  } catch (error) {
    console.log(error);
  }
};

export { getDiscussionImages, addDiscussionImage, deleteDiscussionImage };
