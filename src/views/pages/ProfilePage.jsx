import React, { useContext, useEffect, useState } from "react";
import { Input } from "../components/FormInput";
import { getUserProfile, updateUserProfile } from "../../scripts/api/users";
import "../../styles/pages/profilePage.css";
import fetchProfileImage from "../../scripts/fetchProfileImage";
import { toast } from "react-toastify";
import userProfileContext from "../../context/userProfile.context";
import ChangePasswordModal from "../components/modal/ChangePasswordModal";

const ProfilePage = ({ setUserProfileImage }) => {
  const { setUserProfile } = useContext(userProfileContext);
  const [userImage, setUserImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [userImageToUpload, setUserImageToUpload] = useState();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      await getUserProfile().then(async (data) => {
        const image = await fetchProfileImage(data.user_imageUrl);
        setUserImage(image);
        setPreviewImage(image);
        setName(data.user_name);
        setNim(data.user_nim);
        setEmail(data.user_email);
        setIsLoading(false);
      });
    };
    getProfile();
  }, []);

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeNim = (event) => {
    const { value } = event.target;
    const res = value.slice(0, 11);
    setNim(res);
  };

  const handleOnChangeUserImage = (event) => {
    const file = event.target.files[0] || userImage;
    if (event.target.files && event.target.files.length > 0) {
      setPreviewImage(URL.createObjectURL(file));
    }

    setUserImageToUpload(file);
  };

  const handleOnClickRemoveImage = async () => {
    setPreviewImage(userImage);
    setUserImageToUpload();
  };

  const handleOnClickEditMode = () => {
    if (editMode === true) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (userImageToUpload === null || !userImageToUpload) {
      const imageToBlob = (await fetch(userImage)).blob();

      updateProfile(await imageToBlob);
    } else {
      updateProfile(userImageToUpload);
    }
  };

  const updateProfile = async (userImageToUpload) => {
    await updateUserProfile(name, nim, userImageToUpload).then(async (res) => {
      if (res === true) {
        setEditMode(false);

        const newProfile = await getUserProfile();
        setUserProfile(newProfile);
        setUserImage(newProfile.user_imageUrl);
        setUserProfileImage(newProfile.user_imageUrl);
        setName(newProfile.user_name);
        setNim(newProfile.user_nim);
        setIsLoading(false);

        toast.success("Profil berhasil diperbaharui!");
        setUserImageToUpload();
      } else {
        toast.error("Profil gagal diperbaharui!");
      }
    });
  };

  let showEditMode;
  if (editMode) {
    showEditMode = (
      <div className="form-footer">
        <button className="btn btn-cancel" onClick={handleOnClickEditMode}>
          Cancel
        </button>
        <button type="submit" className="btn-edit" onClick={handleOnSubmit}>
          Submit
        </button>
      </div>
    );
  }

  let showEditModeBtn;
  if (editMode === false) {
    showEditModeBtn = (
      <div className="profile-footer">
        <button className="btn-edit btn-show-edit" type="button" onClick={handleOnClickEditMode}>
          Edit
        </button>
        <button type="button" className="btn-change-pwd" onClick={handleShow}>
          Ganti Password
        </button>
      </div>
    );
  }

  let showEditModeProfile;
  if (editMode) {
    showEditModeProfile = (
      <>
        <div className="profile-image-group profile-image-group-edit">
          <img src={previewImage} alt="User profile avatar" className="profile-user-image" />
          {userImageToUpload && (
            <button type="button" onClick={handleOnClickRemoveImage}>
              Hilangkan Foto
            </button>
          )}
        </div>

        <input type="file" onChange={handleOnChangeUserImage} accept="image/*" />
      </>
    );
  } else {
    showEditModeProfile = (
      <img src={userImage} alt="User profile avatar" className="profile-user-image" />
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="profilePage">
      <form id="formSection" onSubmit={handleOnSubmit}>
        <div className="profile-image-group">
          <div className="profile-image-group_container">{showEditModeProfile}</div>
        </div>
        <Input
          label={"Nama"}
          type={"text"}
          name={"name"}
          value={name}
          onChange={handleOnChangeName}
          disabled={!editMode}
        />
        <Input
          label={"NIM"}
          type={"number"}
          nim={""}
          onChange={handleOnChangeNim}
          value={nim}
          disabled={!editMode}
        />
        <Input label={"Email"} type={"email"} name={"email"} value={email} disabled={true} />
        {showEditMode}
      </form>
      {showEditModeBtn}

      {/* Modal */}
      <ChangePasswordModal show={show} handleClose={handleClose} />
    </section>
  );
};

export default ProfilePage;
