import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { Status } from "../Types";

const useStyles = makeStyles({
  statusBadge: {
    borderRadius: "50%",
    width: "17px",
    height: "17px",
  },
  active: {
    backgroundColor: "#3DB330",
  },
  inactive: {
    backgroundColor: "#9D9D9D",
  },
  away: {
    backgroundColor: "#EC7B12",
  },
});

const StatusBadge = ({ status }: { status: Status }) => {
  const { statusBadge, active, inactive, away } = useStyles();
  return (
    <Box
      className={classNames([
        statusBadge,
        {
          [active]: status === "active",
          [inactive]: status === "inactive",
          [away]: "away",
        },
      ])}
    />
  );
};

export default StatusBadge;
