import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Input } from "../FormInput";
import { AiFillEdit } from "react-icons/ai";
import { getMatkulList, updateMatkul } from "../../../scripts/api/matkuls";

const UpdateMatkulModal = ({ valueName, valueCode, setMatkulList, matkulId }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [matkulName, setMatkulName] = useState(valueName);
  const [matkulCode, setMatkulCode] = useState(valueCode);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleOnChangeMatkulName = (event) => {
    setMatkulName(event.target.value);
  };

  const handleOnChangeMatkulCode = (event) => {
    setMatkulCode(event.target.value);
  };

  const handleOnSubmitUpdateMatkul = async (event) => {
    event.preventDefault();
    await updateMatkul(matkulId, matkulName, matkulCode).then(async () => {
      setMatkulList(await getMatkulList());
    });
  };

  return (
    <>
      <button className="btn-edit" onClick={handleShowUpdate}>
        <AiFillEdit size={25} />
      </button>
      
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`modal-create-matkul`}
      >
        <form onSubmit={handleOnSubmitUpdateMatkul} className="form-create-matkul">
          <Modal.Header closeButton>
            <Modal.Title>Edit Mata Kuliah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              label={"Nama Mata Kuliah"}
              type={"text"}
              onChange={handleOnChangeMatkulName}
              defaultValue={valueName}
            />
            <Input
              label={"Kode Mata Kuliah"}
              type={"text"}
              onChange={handleOnChangeMatkulCode}
              defaultValue={valueCode}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-secondary" onClick={handleCloseUpdate}>
              Batal
            </Button>
            <Button type="submit" className="btn-submit-matkul">
              Edit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateMatkulModal;
