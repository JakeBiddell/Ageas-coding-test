import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Status, User } from "../Types";
import StatusBadge from "./StatusBadge";

const useStyles = makeStyles({
  card: {
    width: "308px",
    border: "1px solid #707070",
    display: "flex",
    margin: "10px",
    padding: "10px",
    paddingLeft: "15px",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  content: {
    flex: "1 0 auto",
    textAlign: "left",
    paddingLeft: "15px",
  },
  nameText: {
    fontSize: "16px",
    color: "#707070",
  },
  statusText: {
    fontSize: "14px",
    color: "#707070",
    fontStyle: "italic",
  },
});

const MemberCard = ({ firstName, lastName, status }: User) => {
  const { card, content, nameText, statusText } = useStyles();
  return (
    <Box className={card}>
      <StatusBadge status={status} />
      <Box className={content}>
        <Box className={nameText}>
          {firstName} {lastName}
        </Box>
        <Box className={statusText}>{status}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(MemberCard);
