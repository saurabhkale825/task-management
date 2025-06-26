import React from "react";
import "./Header.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
  content: string;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
     const navigate = useNavigate();
      const handleBackBtn = (): void => {
        navigate("/");
      };


  return (
    <header className="header add-task-page-header">
      <KeyboardBackspaceIcon
        className="add-task-page-back-btn"
        onClick={handleBackBtn}
      />
      <div>{content}</div>
    </header>
  );
};

export default Header;
