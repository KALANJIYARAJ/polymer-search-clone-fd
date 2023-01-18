import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Remove() {

  const navigate = useNavigate();
  localStorage.removeItem("myreact");
  localStorage.removeItem("user");

  useEffect(() => {
    navigate("/");
  }, []);
}

export default Remove;
