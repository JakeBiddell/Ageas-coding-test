import { createSlice } from "@reduxjs/toolkit";
import { PaginatedList, User } from "../../Types";

type State = {
  entityStore: { [key: number]: User };
  loading: boolean;
  paginatedLists: { [id: string]: PaginatedList<User> };
};

const initialState: State = {
  entityStore: {},
  loading: false,
  paginatedLists: {},
};

const slice = createSlice({
  name: "User",
  initialState,
  reducers: {},
});
