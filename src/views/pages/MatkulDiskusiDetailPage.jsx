import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import { GoReply } from "react-icons/go";
import DiskusiComment from "../components/discussion/DiskusiComment";
import { getOneMatkul } from "../../scripts/api/matkuls";
import { useNavigate, useParams } from "react-router-dom";
import { getBasicUserInfo, getUserProfile } from "../../scripts/api/users";
import {
  deleteDiscussion,
  editDiscussion,
  editDiscussionStatus,
  getOneDiscussion,
} from "../../scripts/api/discussions";
import { createComment, getAllComments } from "../../scripts/api/comments";
import { AiFillEdit } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { Input } from "../components/FormInput";
import Paginate from "../components/paginate/Paginate";
import DeleteModal from "../components/modal/DeleteModal";
import "../../styles/pages/matkulDiskusiDetailPage.css";
import { UserProfileConsumer } from "../../context/userProfile.context";
import {
  DiskusiCardHeader,
  DiskusiCardHeaderNewComment,
} from "../components/discussion/DiskusiCardHeader";
import DiskusiImages from "../components/discussion/DiskusiImages";
import EditDiskusiImages from "../components/discussion/EditDiskusiImages";

const MatkulDiskusiDetailPage = () => {
  const navigate = useNavigate();
  const { id_matkul, id_discussion } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [matkul, setMatkul] = useState(getOneMatkul(id_matkul));
  const [discussion, setDiscussion] = useState(getOneDiscussion(id_discussion));
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState();
  const [userProfileImage, setUserProfileImage] = useState();
  const [commentValue, setCommentValue] = useState();
  const [user, setUser] = useState(getUserProfile());
  const [editMode, setEditMode] = useState(false);
  const [discussionTitle, setDiscussionTitle] = useState();
  const [discussionDesc, setDiscussionDesc] = useState();
  const [discussionStatus, setDiscussionStatus] = useState();
  const [show, setShow] = useState(false);

  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const matkul = await getOneMatkul(id_matkul);
      setMatkul(matkul);

      const discussion = await getOneDiscussion(id_discussion);
      setDiscussion(discussion);
      setDiscussionStatus(discussion.discussion_status);

      const comments = await getAllComments(id_discussion);
      setComments(comments);

      const user = await getBasicUserInfo(discussion.id_user);
      setUserName(user.user_name);
      setUserProfileImage(user.user_imageUrl);

      setIsLoading(false);
    };
    getData();
  }, [id_matkul, id_discussion]);

  useEffect(() => {
    setIsLoading(true);
    const getUserInfo = async () => {
      const user = await getUserProfile();

      setUser(user);
      setIsLoading(false);
    };

    getUserInfo();
  }, [id_matkul]);

  // Handle Create Comment
  const handleOnChangeComment = (event) => {
    const value = event.target.value;
    if (value.replaceAll(" ", "").length > 0) {
      setCommentValue(value);
    } else {
      setCommentValue(null);
    }
  };

  const handleOnClickCommentSubmit = async () => {
    await createComment(id_discussion, commentValue).then(async () => {
      const comments = await getAllComments(id_discussion);
      setComments(comments);
    });
  };

  const handleOnClickDeleteDiscussion = async () => {
    await deleteDiscussion(id_matkul, id_discussion).then(() => {
      navigate(`/forum/${id_matkul}`);
      toast.success("Diskusi berhasil dihapus!");
    });
  };

  const handleOnClickEditDiscussion = async () => {
    if (editMode === false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  const handleOnClickEditDiscussionStatus = async () => {
    await editDiscussionStatus(id_matkul, id_discussion).then(async () => {
      const discussion = await getOneDiscussion(id_discussion);
      setDiscussion(discussion);
      setDiscussionStatus(discussion.discussion_status);
    });
  };

  const handleSubmitEdit = async () => {
    await editDiscussion(id_matkul, id_discussion, discussionTitle, discussionDesc).then(
      async () => {
        setDiscussion(await getOneDiscussion(id_discussion));
        setEditMode(false);
      }
    );
  };

  const renderCommentsCard = ({ currentItems }) => {
    return (
      <>
        {currentItems.map((comment, i) => (
          <DiskusiComment
            key={i}
            {...comment}
            setComments={setComments}
            id_matkul={id_matkul}
            id_role={user.id_role}
          />
        ))}
      </>
    );
  };

  // Check user to show action buttons
  let discussionOwner;
  const checkOwner = user.id === discussion.id_user;
  const checkRole = user.id_role === 1;
  if (checkOwner || checkRole) {
    discussionOwner = (
      <>
        {checkOwner && (
          <button
            className="diskusi-card_icon-group btn-edit"
            onClick={handleOnClickEditDiscussion}
          >
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

  let changeStatus;
  if (discussionStatus) {
    changeStatus = (
      <button className="btn-change-status" onClick={handleOnClickEditDiscussionStatus}>
        <p className="diskusi-card_header-status-finish">Selesai</p>
      </button>
    );
  } else {
    changeStatus = (
      <button className="btn-change-status" onClick={handleOnClickEditDiscussionStatus}>
        <p className="diskusi-card_header-status-notFinish">Belum</p>
      </button>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="matkulDiskusiDetailPage">
      {/* Diskusi Title/Header */}
      <section className="diskusi-detail_title">
        <div className="diskusi-header">
          <div className="diskusi-header_top">
            <button className="navigate-back">
              <IoIosArrowBack onClick={() => navigate(-1)} />
            </button>
            <h1>
              {matkul.matkul_name} - {matkul.matkul_code}
            </h1>
          </div>
          <hr />
        </div>

        {/* Diskusi Header Content */}
        <div className="diskusi-detail_content">
          <div className="diskusi-card">
            <div className="diskusi-card_header-group">
              <DiskusiCardHeader
                user_name={userName}
                discussion_status={discussionStatus}
                createdAt={discussion.createdAt}
                user_imageUrl={userProfileImage}
                checkOwner={checkOwner}
              />
              {checkOwner && changeStatus}
            </div>

            <div className="diskusi-card_content">
              {editMode === false ? (
                <>
                  <h3>{discussion.discussion_title}</h3>
                  <p>{discussion.discussion_description}</p>
                  <DiskusiImages />
                </>
              ) : (
                <div className="diskusi-edit">
                  <Input
                    label={"Judul Diskusi"}
                    type={"text"}
                    onChange={(event) => setDiscussionTitle(event.target.value)}
                    defaultValue={discussion.discussion_title}
                  />
                  <div className="form-input">
                    <label>Deskripsi Diskusi</label>
                    <textarea
                      className="edit-comment-area"
                      onChange={(event) => setDiscussionDesc(event.target.value)}
                      defaultValue={discussion.discussion_description}
                      required
                    />
                  </div>
                  <EditDiskusiImages setIsLoading={setIsLoading} />
                  <div className="diskusi-edit_btn-group">
                    <button
                      className="btn btn-danger btn-edit-diskusi-cancel"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success btn-edit-diskusi" onClick={handleSubmitEdit}>
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="diskusi-card_footer">
              <div className="diskusi-card_icon-group">
                <BsFillChatDotsFill />
                <p>{comments.length} Pembahasan</p>
              </div>
              <div>
                <a href="#replyInput" className="diskusi-card_icon-group btn-reply">
                  <GoReply />
                  <p>Balas</p>
                </a>
              </div>
              {discussionOwner}
            </div>
          </div>
        </div>
      </section>

      {/* Show Modal delete confirmation */}
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handler={handleOnClickDeleteDiscussion}
        title={"Diskusi"}
        description={"diskusi"}
      />

      {/* Create New Comment */}
      <UserProfileConsumer>
        {({ userProfile }) => {
          return (
            <section className="diskusi-detail_comment-new">
              <DiskusiCardHeaderNewComment {...userProfile} />
              <textarea
                id="replyInput"
                placeholder="Balas disini..."
                onChange={handleOnChangeComment}
                required
              />
              <div className="diskusi-detail_comment-new-btn">
                <button
                  className="btn"
                  onClick={handleOnClickCommentSubmit}
                  disabled={
                    commentValue === "" || commentValue === null || commentValue === undefined
                      ? true
                      : false
                  }
                >
                  Balas
                </button>
              </div>
            </section>
          );
        }}
      </UserProfileConsumer>

      {/* Show Comment */}
      <section className="diskusi-detail_comment-list">
        <hr />
        {comments.length !== 0 ? (
          <Paginate
            Items={renderCommentsCard}
            data={comments}
            itemsPerPage={8}
            listClassName={"diskusi-detail_comment-list"}
          />
        ) : (
          <p>Belum ada jawaban!</p>
        )}
      </section>
    </section>
  );
};

export default MatkulDiskusiDetailPage;
