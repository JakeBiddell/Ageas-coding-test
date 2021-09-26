import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors, userActions } from "../Slices";
import MemberCard from "./MemberCard";
import SelectInput from "./SelectInput";

const listId = "MembersList";
const earliestDateOfBirth = (() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
})();

const MembersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) =>
    userSelectors.getUsers(state)(listId)
  );
  const over18s = useMemo(
    () => users.filter((u) => new Date(u.dateOfBirth) <= earliestDateOfBirth),
    [users]
  );
  const userComponents = useMemo(
    () => over18s?.map((u) => <MemberCard key={u.id} {...u} />),
    [over18s]
  );
  useEffect(() => {
    dispatch(userActions.addPaginatedList(listId));
    dispatch(
      userActions.sortPaginatedList({
        listId,
        column: "firstName",
        direction: "asc",
      })
    );
  }, []);
  const statusFilterCallback = useCallback(
    (value) => {
      if (value === "all") {
        dispatch(userActions.clearFilter(listId));
      } else {
        dispatch(
          userActions.filterPaginatedList({ listId, column: "status", value })
        );
      }
    },
    [dispatch]
  );
  const sortCallBack = useCallback(
    (direction) => {
      dispatch(
        userActions.sortPaginatedList({
          listId,
          column: "firstName",
          direction,
        })
      );
    },
    [dispatch]
  );
  return (
    <Box>
      <Box display="flex">
        <SelectInput
          label="Status"
          values={{
            all: "All",
            active: "Online",
            inactive: "Offline",
            away: "Away",
          }}
          onChange={statusFilterCallback}
        />
        <SelectInput
          label="Order by"
          values={{ asc: "A - Z", desc: "Z - A" }}
          onChange={sortCallBack}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" width="710px">
        {userComponents}
      </Box>
    </Box>
  );
};

export default React.memo(MembersList);
