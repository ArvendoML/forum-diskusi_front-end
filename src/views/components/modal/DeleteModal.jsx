import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../styles/components/diskusiModal.css";

const DeleteModal = ({ show, handleClose, handler, title, description }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Hapus {title}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Apakah anda yakin ingin menghapus {description} ini?</Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button className="btn btn-danger" onClick={handler}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
