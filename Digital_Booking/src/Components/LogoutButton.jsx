import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <button onClick={handleLogout} className="button">
      Cerrar sesión{" "}
    </button>
  );
};
export default LogoutButton;
