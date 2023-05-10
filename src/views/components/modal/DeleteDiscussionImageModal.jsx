import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { deleteDiscussionImage, getDiscussionImages } from "../../../scripts/api/discussionImages";

const DeleteDiscussionImageModal = ({ setImages, discussionId, discussionImageId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnClickDeleteMatkul = async (event) => {
    event.preventDefault();
    await deleteDiscussionImage(discussionImageId).then(async () => {
      handleClose();
      setImages(await getDiscussionImages(discussionId));
    });
  };

  return (
    <>
      <button type="button" className="btn-remove-image" onClick={handleShow}>
        Hapus Foto
      </button>

      <DeleteModal
        show={show}
        handleClose={handleClose}
        handler={handleOnClickDeleteMatkul}
        title={"Foto Dikusi"}
        description={"foto diskusi"}
      />
    </>
  );
};

export default DeleteDiscussionImageModal;
