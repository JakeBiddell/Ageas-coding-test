import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Status } from "../Types";
import StatusBadge from "./StatusBadge";

const useStyles = makeStyles({
  card: {
    height: "20px",
    width: "308px",
    border: "1px solid #707070",
    display: "flex",
  },
  content: {
    flex: "1 0 auto",
    display: "flex",
    justifyContent: "center",
  },
  nameText: {
    fontSize: "16px",
    color: "#707070",
  },
  statusText: {
    fontSize: "14px",
    color: "#707070",
  },
});

const MemberCard = ({ name, status }: { name: string; status: Status }) => {
  const { card, content, nameText, statusText } = useStyles();
  return (
    <Box className={card}>
      <StatusBadge status={status} />
      <Box className={content}>
        <Box className={nameText}>{name}</Box>
        <Box className={statusText}>{status}</Box>
      </Box>
    </Box>
  );
};

export default MemberCard;
