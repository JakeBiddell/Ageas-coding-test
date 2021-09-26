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
    addPaginatedList(state, { payload }: PayloadAction<string>) {
      if (!Object.keys(state.paginatedLists).includes(payload)) {
        state.paginatedLists = {
          ...state.paginatedLists,
          [payload]: {
            ids: Object.keys(state.entityStore).map((id) => +id),
            sort: undefined,
            filter: undefined,
          },
        };
      }
    },
    sortPaginatedList(
      state,
      {
        payload: { listId, column, direction },
      }: PayloadAction<{
        listId: string;
        column: keyof User;
        direction: SortDirection;
      }>
    ) {
      state.paginatedLists[listId].sort = { column, direction };
      const allEntities = Object.values(state.entityStore);
      const filter = state.paginatedLists[listId].filter;
      const filteredEntities = !filter
        ? allEntities
        : allEntities.filter((e) => e[filter.column] === filter.value);
      const sortedEntities = filteredEntities.sort(
        direction === "asc"
          ? (a, b) => a[column].toString().localeCompare(b[column].toString())
          : (a, b) => b[column].toString().localeCompare(a[column].toString())
      );
      state.paginatedLists[listId].ids = sortedEntities.map((e) => e.id);
    },
  },
});
