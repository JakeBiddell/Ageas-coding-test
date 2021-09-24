import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { User } from "../Types";
import MemberCard from "./MemberCard";
import SelectInput from "./SelectInput";

const MembersList = () => {
  const users = [] as User[];
  const userComponents = useMemo(
    () => users.map((u) => <MemberCard key={u.id} {...u} />),
    [users]
  );
  return (
    <Box>
      <Box display="flex">
        <SelectInput
          label="Status"
          values={{ all: "All" }}
          onChange={() => {}}
        />
        <SelectInput label="Order by" values={{}} onChange={() => {}} />
      </Box>
      <Box display="flex" flexWrap="wrap" width="350px">
        {userComponents}
      </Box>
    </Box>
  );
};

export default React.memo(MembersList);
