import avatar from "../public/images/avatar.webp";

const fetchProfileImage = async (imageUrl) => {
  if (imageUrl === null || !imageUrl || imageUrl === undefined) {
    return avatar;
  } else {
    let res = "";
    const image = imageUrl.split("/");

    for (let i = 0; i <= 5; i++) {
      res = res + image[i] + "/";
    }
    res += "f_auto";
    for (let i = 6; i < image.length; i++) {
      res += "/" + image[i];
    }

    return res || avatar;
  }
};

export default fetchProfileImage;
