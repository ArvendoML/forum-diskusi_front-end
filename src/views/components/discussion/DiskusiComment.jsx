import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiFillEdit } from "react-icons/ai";
import "../../../styles/components/diskusiComment.css";
import { DiskusiCardHeader } from "./DiskusiCardHeader";
import { getBasicUserInfo } from "../../../scripts/api/users";
import {
  checkIfUserDislikeComment,
  checkIfUserLikeComment,
  deleteComment,
  dislikeComment,
  editComment,
  getAllComments,
  likeComment,
  undislikeComment,
  unlikeComment,
} from "../../../scripts/api/comments";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteModal from "../modal/DeleteModal";
import { toast } from "react-toastify";
import { getDataFromToken } from "../../../scripts/api/auth";
import Skeleton from "react-loading-skeleton";

const DiskusiComment = ({
  id,
  id_discussion,
  comment_description,
  comment_user_like,
  comment_user_dislike,
  id_user,
  createdAt,
  setComments,
  id_role,
}) => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState(getDataFromToken());
  const [commentDesc, setCommentDesc] = useState(comment_description);
  const [commentLikes, setCommentLikes] = useState(0);
  const [commentDislikes, setCommentDislikes] = useState(0);
  const [isUserLike, setIsUserLike] = useState();
  const [isUserDislike, setIsUserDislike] = useState();
  const [userImageUrl, setUserImageUrl] = useState();
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const user = await getBasicUserInfo(id_user);
      setUserName(user.user_name);
      setUserImageUrl(user.user_imageUrl);

      const userLike = await checkIfUserLikeComment(id);
      setIsUserLike(userLike);

      const userId = getDataFromToken();
      setUserId(userId.id);

      setIsLoading(false);
    };
    getData();

    // Set Comment Like and Dislike
    if (comment_user_like !== null) setCommentLikes(comment_user_like.length);
    if (comment_user_dislike !== null) setCommentDislikes(comment_user_dislike.length);

    // Check if user already like comment
    const checkLike = async () => {
      await checkIfUserLikeComment(id).then((res) => {
        if (res === true) {
          setIsUserLike(true);
        } else {
          setIsUserLike(false);
        }
      });
    };
    checkLike();

    // Check if user already dislike comment
    const checkdislike = async () => {
      await checkIfUserDislikeComment(id).then((res) => {
        if (res === true) {
          setIsUserDislike(true);
        } else {
          setIsUserDislike(false);
        }
      });
    };
    checkdislike();
  }, [comment_user_like, comment_user_dislike, id_user, id]);

  // Handle Like and Dislike Buttons
  const handleOnClickLike = async () => {
    await likeComment(id_discussion, id).then(() => {
      setCommentLikes(commentLikes + 1);
      setIsUserLike(true);
    });
  };

  const handleOnClickUnlike = async () => {
    await unlikeComment(id_discussion, id).then(() => {
      setCommentLikes(commentLikes - 1);
      setIsUserLike(false);
    });
  };

  const handleOnClickDislike = async () => {
    await dislikeComment(id_discussion, id).then(() => {
      setCommentDislikes(commentDislikes + 1);
      setIsUserDislike(true);
    });
  };

  const handleOnClickUndislike = async () => {
    await undislikeComment(id_discussion, id).then(() => {
      setCommentDislikes(commentDislikes - 1);
      setIsUserDislike(false);
    });
  };

  // Handle Edit
  const handleOnClickEdit = async () => {
    if (editMode === false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  const handleOnChangeEdit = async (event) => {
    setCommentDesc(event.target.value);
  };

  const handleOnClickEditSubmit = async () => {
    await editComment(id_discussion, id, commentDesc).then(() => {
      setEditMode(false);
    });
  };

  // Handle Delete
  const handleOnClickDelete = async () => {
    await deleteComment(id_discussion, id).then(async () => {
      setComments(await getAllComments(id_discussion));
      toast.success("Komentar berhasil dihapus!");
    });
  };

  let showAction;
  const isOwner = userId === id_user;
  if (isOwner || id_role === 1) {
    showAction = (
      <>
        {isOwner && (
          <button className="diskusi-card_icon-group btn-edit" onClick={handleOnClickEdit}>
            <AiFillEdit />
            <p>Edit</p>
          </button>
        )}
        <button className="diskusi-card_icon-group btn-delete" onClick={handleShow}>
          <BsFillTrashFill />
          <p>Hapus</p>
        </button>
      </>
    );
  }

  return (
    <>
      <div className="diskusi-detail_comment-user">
        {isLoading ? (
          <Skeleton count={3} />
        ) : (
          <>
            <DiskusiCardHeader
              user_name={userName}
              user_imageUrl={userImageUrl}
              createdAt={createdAt}
            />
            <div className="diskusi-card_content">
              {editMode === true ? (
                <>
                  <textarea
                    onChange={handleOnChangeEdit}
                    defaultValue={commentDesc}
                    className="edit-comment-area"
                    required
                  />
                  <div className="diskusi-edit_btn-group">
                    <button
                      className="btn btn-danger btn-edit-diskusi-cancel"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success btn-submit-edit"
                      onClick={handleOnClickEditSubmit}
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <p>{commentDesc}</p>
              )}
            </div>

            {/* Show Modal delete confirmation */}
            <DeleteModal
              show={show}
              handleClose={handleClose}
              handler={handleOnClickDelete}
              title={"Komentar"}
              description={"komentar"}
            />

            <div className="diskusi-card_footer diskusi-card_footer-mobile">
              <div className="diskusi-card_icon-group">
                {isUserLike === true ? (
                  <button className="btn-like-true" onClick={handleOnClickUnlike}>
                    <AiFillLike />
                  </button>
                ) : (
                  <button
                    className="btn-like-false"
                    onClick={handleOnClickLike}
                    disabled={isUserDislike}
                  >
                    <AiFillLike />
                  </button>
                )}
                <p>{commentLikes}</p>
              </div>
              <div className="diskusi-card_icon-group">
                {isUserDislike === true ? (
                  <button className="btn-dislike-true" onClick={handleOnClickUndislike}>
                    <AiFillDislike />
                  </button>
                ) : (
                  <button
                    className="btn-dislike-false"
                    onClick={handleOnClickDislike}
                    disabled={isUserLike}
                  >
                    <AiFillDislike />
                  </button>
                )}
                <p>{commentDislikes}</p>
              </div>
              {showAction}
            </div>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default DiskusiComment;
