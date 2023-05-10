import axios from "axios";
import { getAccessToken } from "./auth";

// const BASE_URL = "http://localhost:8000/api/discussions";
const BASE_URL = "https://forum-diskusiback-end-production.up.railway.app/api/discussions";

const getDiscussionList = async (id) => {
  try {
    const discussionsList = await axios.get(`${BASE_URL}/${id}`);

    return discussionsList.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getOneDiscussion = async (id_discussion) => {
  try {
    const discussion = await axios.get(`${BASE_URL}/${id_discussion}/detail`);

    return discussion.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createDiscussion = async (id_matkul, discussion_title, discussion_description) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/${id_matkul}/create`,
      {
        discussion_title: discussion_title,
        discussion_description: discussion_description,
      },
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );

    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

const editDiscussion = async (
  id_matkul,
  id_discussion,
  discussion_title,
  discussion_description
) => {
  try {
    await axios.put(
      `${BASE_URL}/${id_matkul}/edit/${id_discussion}`,
      {
        discussion_title: discussion_title,
        discussion_description: discussion_description,
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

const editDiscussionStatus = async (id_matkul, id_discussion) => {
  try {
    await axios.put(
      `${BASE_URL}/${id_matkul}/edit/${id_discussion}/status`,
      {},
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

const deleteDiscussion = async (id_matkul, id_discussion) => {
  try {
    await axios.delete(`${BASE_URL}/${id_matkul}/delete/${id_discussion}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getDiscussionList,
  getOneDiscussion,
  createDiscussion,
  editDiscussion,
  editDiscussionStatus,
  deleteDiscussion,
};
