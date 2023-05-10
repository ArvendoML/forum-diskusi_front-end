import Card from "react-bootstrap/Card";
import "../../../styles/components/matkulCard.css";
import { Link } from "react-router-dom";
import { BiBookBookmark } from "react-icons/bi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { getUserMatkulList, userAddMatkul, userRemoveMatkul } from "../../../scripts/api/users";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const MatkulCard = ({
  id,
  matkul_name,
  matkul_code,
  matkul_mode,
  setUserMatkulList,
  checkMatkulMode,
}) => {
  const [matkulMode, setMatkulMode] = useState(matkul_mode);

  useEffect(() => {
    if (checkMatkulMode) {
      checkMatkulMode(id).then((data) => {
        setMatkulMode(data);
      });
    }
  }, [checkMatkulMode, id]);

  const handleOnClickUserAddMatkul = async () => {
    const res = await userAddMatkul(id);
    if (res === 409) {
      toast.warning("Mata kuliah telah terdapat di daftar anda!");
    } else if (res === true) {
      setMatkulMode("userMatkul");
      toast.success("Mata kuliah berhasil ditambahkan ke daftar anda!");
    } else {
      toast.error("Mata kuliah gagal ditambahkan ke daftar anda!");
    }
  };

  const handleOnClickUserRemoveMatkul = async () => {
    const res = await userRemoveMatkul(id);
    if (res === true) {
      if (setUserMatkulList) {
        setUserMatkulList(await getUserMatkulList());
      }
      setMatkulMode("allMatkul");
      toast.success("Mata kuliah berhasil dihilangkan dari daftar anda!");
    } else {
      toast.error("Mata kuliah gagal dihilangkan dari daftar anda!");
    }
  };

  return (
    <div className="matkul-card card-hover">
      <div className="matkul-card-group">
        <div className="matkul-card-action">
          {matkulMode === "allMatkul" ? (
            <button onClick={handleOnClickUserAddMatkul}>
              <AiFillPlusSquare color="green" size={35} />
            </button>
          ) : (
            <button onClick={handleOnClickUserRemoveMatkul}>
              <AiFillMinusSquare color="red" size={35} />
            </button>
          )}
        </div>
        <Link to={`/forum/${id}`}>
          <Card>
            <Card.Header>
              <BiBookBookmark size={100} />
            </Card.Header>
            <Card.Body>
              <Card.Title>{matkul_name}</Card.Title>
              <div>
                <hr />
                <Card.Text>{matkul_code}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default MatkulCard;
