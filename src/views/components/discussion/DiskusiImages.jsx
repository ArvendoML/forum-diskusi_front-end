import React, { useEffect, useState } from "react";
import { getDiscussionImages } from "../../../scripts/api/discussionImages";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import "../../../styles/components/diskusiImages.css";

const DiskusiImages = () => {
  const { id_discussion } = useParams();
  const [discussionImages, setDiscussionImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const discussionImage = await getDiscussionImages(id_discussion);

      setDiscussionImages(discussionImage);
    };

    getData();
  }, [id_discussion]);

  return (
    <>
      {discussionImages.length > 0 && (
        <section id="diskusiImagesCarousel">
          <Carousel
            slide={false}
            variant="dark"
            controls={discussionImages.length > 1 ? true : false}
          >
            {discussionImages.map((image, i) => (
              <Carousel.Item key={i}>
                <img className="d-block w-100" src={image.discussionImageUrl} alt="First slide" />
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      )}
    </>
  );
};

export default DiskusiImages;
