"use client";

import { Button, ButtonProps, styled } from "@mui/material";

const BlackStyledButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.2rem",
  padding: "12px 24px",
  border: "2px solid #C0C0C0",
  borderRadius: "10px",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundColor: "#333",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.8)",
    transform: "scale(1.05)",
  },
  "&:active": {
    backgroundColor: "#111",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
    transform: "scale(0.95)",
  },
});

interface BasicButtonProps extends ButtonProps {
  text: string;
}

const BlackButton: React.FC<BasicButtonProps> = ({ text, ...props }) => {
  return <BlackStyledButton {...props}>{text}</BlackStyledButton>;
};

export default BlackButton;
