const fetchDiskusiImage = async (imageUrl) => {
  let res = "";
  const image = imageUrl.split("/");

  for (let i = 0; i <= 5; i++) {
    res = res + image[i] + "/";
  }
  res += "f_auto";
  for (let i = 6; i < image.length; i++) {
    res += "/" + image[i];
  }

  return res;
};

export default fetchDiskusiImage;
