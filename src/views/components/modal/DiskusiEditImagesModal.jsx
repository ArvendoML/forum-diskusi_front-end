import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../styles/components/diskusiModal.css";
import { useState } from "react";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import { addDiscussionImage, getDiscussionImages } from "../../../scripts/api/discussionImages";

const DiskusiEditImagesModal = ({
  show,
  handleClose,
  id_discussion,
  discussionImages,
  setDiscussionImages,
  setIsLoading,
}) => {
  const [addedNewImages, setAddedNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleOnChangeImage = async (event) => {
    if (previewImages.length + discussionImages.length < 4) {
      const file = event.target.files[0];
      if (event.target.files && event.target.files.length > 0) {
        setPreviewImages([...previewImages, URL.createObjectURL(file)]);
        setAddedNewImages([...addedNewImages, file]);
      }
    } else {
      toast.error("Foto telah mencapai maximum (4 Foto)!");
    }
  };

  const handleOnClickRemoveImage = (idx) => {
    const removePreview = previewImages.splice(idx, 1);
    const imagePreview = previewImages.filter((image) => image !== removePreview);

    const removeImage = addedNewImages.splice(idx, 1);
    const images = addedNewImages.filter((image) => image !== removeImage);

    if (imagePreview.length < 1) {
      setPreviewImages([]);
      setAddedNewImages([]);
    } else {
      setPreviewImages(previewImages);
      setAddedNewImages(images);
    }
  };

  const handleOnClickSubmitImages = async () => {
    setIsLoading(true);
    const promises = addedNewImages.map(async (image) => {
      await addDiscussionImage(id_discussion, image).then(async () => {
        toast.success("Foto diskusi berhasil ditambahkan!");
        setDiscussionImages(await getDiscussionImages(id_discussion));
      });
    });

    await Promise.all(promises).then(() => {
      setPreviewImages([]);
      setAddedNewImages([]);
      setIsLoading(false);
    });

    handleClose();
  };

  const handleCloseModal = () => {
    setAddedNewImages([]);
    setPreviewImages([]);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="diskusi-modal-add-image"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tambah Foto Diskusi</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form-insert-image">
        {previewImages.length > 0 && (
          <Carousel slide={false} variant="dark" controls={previewImages.length > 1 ? true : false}>
            {previewImages.map((image, i) => (
              <Carousel.Item key={i} className={i === 0 && "active"}>
                <img className="d-block w-100 diskusi-image-edit" src={image} alt="" />
                <button
                  type="button"
                  onClick={() => handleOnClickRemoveImage(i)}
                  className="btn-remove-image"
                >
                  Hilangkan Foto
                </button>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        <div className="diskusi-image-input">
          <input type="file" accept="image/*" onChange={handleOnChangeImage} />
          <p>Dapat upload lebih dari 1 Foto (max 4)</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={handleCloseModal}>
          Batal
        </Button>
        <Button className="btn btn-success" onClick={handleOnClickSubmitImages}>
          Tambah
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiskusiEditImagesModal;
