import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useMemo } from "react";

const useStyles = makeStyles({
  selectBox: {
    padding: "4px 8px",
    minWidth: "126px",
  },
  labelStyle: {
    fontSize: "14px",
    textAlign: "left",
  },
});
type Props = {
  label: string;
  values: { [key: string]: string };
  onChange: (value: string) => void;
};

const SelectInput = ({ label, values, onChange }: Props) => {
  const { selectBox, labelStyle } = useStyles();
  const options = useMemo(
    () =>
      Object.entries(values).map(([key, val]) => (
        <option key={key} value={key}>{val}</option>
      )),
    [values]
  );
  const callback = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <Box ml="10px">
      <Box className={labelStyle}>{label}</Box>
      <select className={selectBox} onChange={callback}>
        {options}
      </select>
    </Box>
  );
};

export default React.memo(SelectInput);
