import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Input } from "../FormInput";
import { createMatkul, getMatkulList } from "../../../scripts/api/matkuls";

const CreateMatkulModal = ({ show, handleClose, setMatkulList }) => {
  const [matkulName, setMatkulName] = useState();
  const [matkulCode, setMatkulCode] = useState();

  const handleOnChangeMatkulName = (event) => {
    setMatkulName(event.target.value);
  };

  const handleOnChangeMatkulCode = (event) => {
    setMatkulCode(event.target.value);
  };

  const handleOnSubmitCreateMatkul = async (event) => {
    event.preventDefault();
    await createMatkul(matkulName, matkulCode).then(async () => {
      handleClose();
      setMatkulList(await getMatkulList());
    });
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
          <Modal.Title>Buat Mata Kuliah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input label={"Nama Mata Kuliah"} type={"text"} onChange={handleOnChangeMatkulName} />
          <Input label={"Kode Mata Kuliah"} type={"text"} onChange={handleOnChangeMatkulCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" className="btn-submit-matkul">
            Buat
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateMatkulModal;
