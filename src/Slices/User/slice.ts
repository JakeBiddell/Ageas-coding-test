import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginatedList, SortDirection, User } from "../../Types";

type State = {
  entityStore: { [key: number]: User };
  loading: boolean;
  paginatedLists: { [id: string]: PaginatedList<User> };
  error: string | undefined;
};

const initialState: State = {
  entityStore: {},
  loading: false,
  paginatedLists: {},
  error: undefined,
};

const slice = createSlice({
  name: "User",
  initialState,
  reducers: {
    startGettingEntities(state) {
      state.loading = true;
      state.error = undefined;
    },
    finishGettingEntities(state, { payload }: PayloadAction<User[]>) {
      state.loading = false;
      state.error = undefined;
      state.entityStore = {
        ...state.entityStore,
        ...payload.reduce(
          (accumulator, user) => ({ ...accumulator, [user.id]: user }),
          {}
        ),
      };
    },
    errorGettingEntities(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = payload;
    },
  },
});
