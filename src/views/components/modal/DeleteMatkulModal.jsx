import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import { deleteMatkul, getMatkulList } from "../../../scripts/api/matkuls";

const DeleteMatkulModal = ({ setMatkulList, matkulId }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleOnClickDeleteMatkul = async (event) => {
    event.preventDefault();
    await deleteMatkul(matkulId).then(async () => {
      handleCloseUpdate();
      setMatkulList(await getMatkulList());
    });
  };

  return (
    <>
      <button className="btn-delete" onClick={handleShowUpdate}>
        <AiFillDelete size={25} />
      </button>

      <DeleteModal
        show={showUpdate}
        handleClose={handleCloseUpdate}
        handler={handleOnClickDeleteMatkul}
        title={"Mata Kuliah"}
        description={"mata kuliah"}
      />
    </>
  );
};

export default DeleteMatkulModal;
