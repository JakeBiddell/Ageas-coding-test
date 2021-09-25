import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import MembersList from "../Components/MembersList";

const useStyles = makeStyles({
  title: {
    color: "#fff",
    fontSize: "30px",
    marginBottom: "20px",
  },
});

const MembersPage = () => {
  const { title } = useStyles();
  return (
    <Box pt="90px">
      <Box className={title}>Members List</Box>
      <MembersList />
    </Box>
  );
};

export default React.memo(MembersPage);
