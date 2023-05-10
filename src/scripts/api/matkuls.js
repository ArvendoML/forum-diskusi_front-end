import axios from "axios";
import { getAccessToken } from "./auth";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api/matkul";

const getMatkulList = async () => {
  try {
    const matkulList = await axios.get(`${BASE_URL}`);

    return matkulList.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getOneMatkul = async (id) => {
  try {
    const matkul = await axios.get(`${BASE_URL}/${id}`);

    return matkul.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createMatkul = async (matkul_name, matkul_code) => {
  try {
    await axios
      .post(
        `${BASE_URL}/add`,
        {
          matkul_name: matkul_name,
          matkul_code: matkul_code,
        },
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        toast.success("Mata kuliah berhasil dibuat!");
      })
      .catch(() => {
        toast.error("Mata kuliah gagal dibuat!");
      });
  } catch (error) {
    console.log(error);
  }
};

const updateMatkul = async (id, matkul_name, matkul_code) => {
  try {
    await axios
      .put(
        `${BASE_URL}/update/${id}`,
        {
          matkul_name: matkul_name,
          matkul_code: matkul_code,
        },
        {
          headers: {
            Authorization: getAccessToken(),
          },
        }
      )
      .then(() => {
        toast.success("Mata kuliah berhasil di edit!");
      })
      .catch(() => {
        toast.error("Mata kuliah gagal di edit!");
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteMatkul = async (id) => {
  try {
    await axios
      .delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(() => {
        toast.success("Mata kuliah berhasil dihapus!");
      })
      .catch(() => {
        toast.error("Mata kuliah gagal dihapus!");
      });
  } catch (error) {
    console.log(error);
  }
};

export { getMatkulList, getOneMatkul, updateMatkul, createMatkul, deleteMatkul };
