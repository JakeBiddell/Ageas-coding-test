import { Box } from "@mui/material";
import React, { useCallback, useMemo } from "react";

type Props = {
  label: string;
  values: { [key: string]: string };
  onChange: (value: string) => void;
};

const SelectInput = ({ label, values, onChange }: Props) => {
  const options = useMemo(
    () =>
      Object.entries(values).map(([key, val]) => (
        <option value={key}>{val}</option>
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
    <Box>
      <Box>{label}</Box>
      <select onChange={callback}>{options}</select>
    </Box>
  );
};


export default React.memo(SelectInput);
