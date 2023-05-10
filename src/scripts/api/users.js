import axios from "axios";
import { getAccessToken } from "./auth";
import { getOneMatkul } from "./matkuls";

const BASE_URL = "http://localhost:8000/api/users";

const getBasicUserInfo = async (id) => {
  try {
    const user = await axios.get(`${BASE_URL}/info/${id}`);

    return user.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async () => {
  try {
    const user = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: getAccessToken(),
      },
    });

    return user.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserMatkulList = async () => {
  try {
    const getUserMatkulList = (await getUserProfile()).user_matkul;
    if (!getUserMatkulList) return [];

    const promises = getUserMatkulList.map(async (matkul_id) => {
      const matkul = await getOneMatkul(matkul_id);
      return matkul;
    });

    const userMatkulList = await Promise.all(promises);
    return userMatkulList;
  } catch (error) {
    console.log(error);
  }
};

const updateUserProfile = async (user_name, user_nim, user_imageUrl) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/profile/update`,
      {
        user_name: user_name,
        user_nim: user_nim,
        user_image: user_imageUrl,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getAccessToken(),
        },
      }
    );

    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const userAddMatkul = async (id_matkul) => {
  try {
    let result;
    const res = await axios
      .put(
        `${BASE_URL}/add-matkul/${id_matkul}`,
        {},
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .catch((data) => {
        result = data.response.status;
      });

    if (res) return true;
    else return result;
  } catch (error) {
    console.log(error);
  }
};

const userRemoveMatkul = async (id_matkul) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/delete-matkul/${id_matkul}`,
      {},
      {
        headers: {
          Authorization: getAccessToken(),
        },
      }
    );

    if (res) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export {
  getBasicUserInfo,
  getUserProfile,
  getUserMatkulList,
  userAddMatkul,
  userRemoveMatkul,
  updateUserProfile,
};
