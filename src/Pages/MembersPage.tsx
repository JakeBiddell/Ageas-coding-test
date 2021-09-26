import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { userThunks } from "../Slices";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MembersList from "../Components/MembersList";

const useStyles = makeStyles({
  title: {
    color: "#fff",
    fontSize: "30px",
    marginBottom: "20px",
  },
});

const MembersPage = () => {
  const dispatch = useDispatch();
  const { title } = useStyles();
  useEffect(() => {
    dispatch(userThunks.getUsers());
  });
  return (
    <Box pt="90px">
      <Box className={title}>Members List</Box>
      <MembersList />
    </Box>
  );
};

export default React.memo(MembersPage);
