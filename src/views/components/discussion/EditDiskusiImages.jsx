import React, { useEffect, useState } from "react";
import { getDiscussionImages } from "../../../scripts/api/discussionImages";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import "../../../styles/components/diskusiImages.css";
import DeleteDiscussionImageModal from "../modal/DeleteDiscussionImageModal";
import DiskusiEditImagesModal from "../modal/DiskusiEditImagesModal";

const EditDiskusiImages = ({ setIsLoading }) => {
  const { id_discussion } = useParams();
  const [discussionImages, setDiscussionImages] = useState([]);
  const [show, setShow] = useState(false);

  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      const discussionImage = await getDiscussionImages(id_discussion);
      setDiscussionImages(discussionImage);
    };

    getData();
  }, [id_discussion]);

  return (
    <section id="diskusiImagesCarousel">
      <Carousel slide={false} variant="dark" controls={discussionImages.length > 1 ? true : false}>
        {discussionImages.map((image, i) => (
          <Carousel.Item key={i} className={i === 0 && "active"}>
            <img
              className="d-block w-100 diskusi-image-edit"
              src={image.discussionImageUrl}
              alt=""
            />
            <DeleteDiscussionImageModal
              setImages={setDiscussionImages}
              discussionId={id_discussion}
              discussionImageId={image.id}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <button onClick={handleShow} className="btn-success btn-add-image">Tambah Foto</button>

      <DiskusiEditImagesModal
        show={show}
        handleClose={handleClose}
        id_discussion={id_discussion}
        discussionImages={discussionImages}
        setDiscussionImages={setDiscussionImages}
        setIsLoading={setIsLoading}
      />
    </section>
  );
};

export default EditDiskusiImages;
