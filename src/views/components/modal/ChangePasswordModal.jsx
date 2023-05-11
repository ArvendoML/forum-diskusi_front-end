import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { InputPassword } from "../FormInput";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../../scripts/api/users";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  const handleOnChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleOnChangeConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleOnSubmitCreateMatkul = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Password tidak sesuai!");
    } else {
      await updateUserPassword(newPassword).then(() => {
        navigate("/profile");
        handleClose();
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-create-matkul"
    >
      <form onSubmit={handleOnSubmitCreateMatkul} className="form-create-matkul">
        <Modal.Header closeButton>
          <Modal.Title>Ganti Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputPassword label={"Password Baru"} onChange={handleOnChangeNewPassword} />
          <InputPassword
            label={"Konfirmasi Password Baru"}
            onChange={handleOnChangeConfirmNewPassword}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" className="btn-submit-matkul">
            Ganti Password
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
