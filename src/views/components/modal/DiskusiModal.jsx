import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input } from "../FormInput";
import { useState } from "react";
import "../../../styles/components/diskusiModal.css";
import { createDiscussion, getDiscussionList } from "../../../scripts/api/discussions";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import { addDiscussionImage } from "../../../scripts/api/discussionImages";

const DiskusiModal = ({ show, handleClose, id_matkul, setDiscussionsList }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleOnChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleOnChangeImage = (event) => {
    if (previewImage.length < 4) {
      const file = event.target.files[0];
      if (event.target.files && event.target.files.length > 0) {
        setPreviewImage([...previewImage, URL.createObjectURL(file)]);
        setImage([...image, file]);
      }
    } else {
      toast.error("Foto telah mencapai maximum (4 Foto)!");
    }
  };

  const handleOnClickCloseModal = () => {
    handleClose();
    setPreviewImage([]);
  };

  const handleOnClickRemoveImage = (idx) => {
    const removePreview = previewImage.splice(idx, 1);
    const previewImages = previewImage.filter((image) => image !== removePreview);

    const removeImage = image.splice(idx, 1);
    const images = image.filter((image) => image !== removeImage);

    if (previewImage.length < 1) {
      setPreviewImage([]);
      setImage([]);
    } else {
      setPreviewImage(previewImages);
      setImage(images);
    }
  };

  const handleSubmitCreateDiscussion = async (event) => {
    event.preventDefault();
    await createDiscussion(id_matkul, title, description).then(async (data) => {
      setDiscussionsList(await getDiscussionList(id_matkul));
      image.map(async (image) => {
        await addDiscussionImage(data.id, image);
      });
      handleClose();
      toast.success("Diskusi berhasil dibuat!");
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="diskusi-create-modal"
    >
      <form onSubmit={handleSubmitCreateDiscussion}>
        <Modal.Header closeButton>
          <Modal.Title>Buat Diskusi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="diskusi-form-create_content">
            <Input label={"Judul Diskusi"} type={"text"} onChange={handleOnChangeTitle} />
            <div className="form-input">
              <label>Deskripsi Diskusi</label>
              <textarea onChange={handleOnChangeDescription} required />
            </div>
            <div className="form-input form-insert-image">
              <label>Sisipkan Foto</label>
              {previewImage.length > 0 && (
                <Carousel
                  slide={false}
                  interval={null}
                  variant="dark"
                  controls={previewImage.length > 1 ? true : false}
                >
                  {previewImage.map((image, i) => (
                    <Carousel.Item key={i} className={i === 0 && "active"}>
                      <img className="d-block w-100" src={image} alt="" />
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
              <div className="form-insert-image_input-group">
                <input type="file" accept="image/*" onChange={handleOnChangeImage} />
                <p>Dapat upload lebih dari 1 Foto (max 4)</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={handleOnClickCloseModal}>
            Batal
          </Button>
          <Button type="submit" className="btn-submit-discussion">
            Buat Diskusi
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DiskusiModal;
