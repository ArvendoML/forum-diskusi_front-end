import axios from "axios";
import { getAccessToken, getDataFromToken } from "./auth";
import { getUserProfile } from "./users";

// const BASE_URL = "http://localhost:8000/api/discussions/comments";
const BASE_URL = "https://forum-diskusiback-end-production.up.railway.app/api/discussions/comments";

// Get Comment
const getAllComments = async (id) => {
  try {
    const commentList = await axios.get(`${BASE_URL}/${id}`);

    return commentList.data.data.reverse();
  } catch (error) {
    console.log(error);
  }
};

const getOneComment = async (id) => {
  try {
    const comment = await axios.get(`${BASE_URL}/${id}/detail`);

    if (comment) return comment.data.data;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

// Create Comment
const createComment = async (
  id_discussion,
  comment_description,
  reply_from_user,
  reply_from_comment_desc
) => {
  try {
    await axios.post(
      `${BASE_URL}/${id_discussion}/create`,
      {
        comment_description: comment_description,
        reply_from_user: reply_from_user || null,
        reply_from_comment_desc: reply_from_comment_desc || null,
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

// Update Edit Comment
const editComment = async (id_discussion, id_comment, editValue) => {
  try {
    await axios.put(
      `${BASE_URL}/${id_discussion}/edit/${id_comment}`,
      { comment_description: editValue },
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

// Delete Comment
const deleteComment = async (id_discussion, id_comment) => {
  try {
    await axios.delete(`${BASE_URL}/${id_discussion}/delete/${id_comment}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Like Unlike Scripts
const likeComment = async (id_discussion, id_comment) => {
  try {
    await axios
      .put(
        `${BASE_URL}/${id_discussion}/like/${id_comment}`,
        {},
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    console.log(error);
  }
};

const unlikeComment = async (id_discussion, id_comment) => {
  try {
    await axios
      .put(
        `${BASE_URL}/${id_discussion}/unlike/${id_comment}`,
        {},
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    console.log(error);
  }
};

const checkIfUserLikeComment = async (id) => {
  const userId = getDataFromToken().id;
  const user_like_comment = (await getOneComment(id)).comment_user_like || [];

  const findUser = user_like_comment.filter((user_id) => user_id === userId);
  if (findUser.length > 0) return true;
  else return false;
};

// Dislike Undislike scripts
const dislikeComment = async (id_discussion, id_comment) => {
  try {
    await axios
      .put(
        `${BASE_URL}/${id_discussion}/dislike/${id_comment}`,
        {},
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    console.log(error);
  }
};

const undislikeComment = async (id_discussion, id_comment) => {
  try {
    await axios
      .put(
        `${BASE_URL}/${id_discussion}/undislike/${id_comment}`,
        {},
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        return true;
      });
  } catch (error) {
    console.log(error);
  }
};

const checkIfUserDislikeComment = async (id) => {
  const userId = (await getUserProfile()).id;
  const user_dislike_comment = (await getOneComment(id)).comment_user_dislike || [];

  const findUser = user_dislike_comment.filter((user_id) => user_id === userId);
  if (findUser.length > 0) return true;
  else return false;
};

export {
  getAllComments,
  getOneComment,
  createComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
  checkIfUserLikeComment,
  dislikeComment,
  undislikeComment,
  checkIfUserDislikeComment,
};
