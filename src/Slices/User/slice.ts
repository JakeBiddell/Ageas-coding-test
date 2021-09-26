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

const recalcPaginatedList = (
  state: State,
  { filter, sort }: PaginatedList<User>
) => {
  const allEntities = Object.values(state.entityStore);
  const filteredEntities = !filter
    ? allEntities
    : allEntities.filter((e) => e[filter.column] === filter.value);
  const sortedEntities = !sort
    ? allEntities
    : filteredEntities.sort(
        sort.direction === "asc"
          ? (a, b) =>
              a[sort.column].toString().localeCompare(b[sort.column].toString())
          : (a, b) =>
              b[sort.column].toString().localeCompare(a[sort.column].toString())
      );
  return sortedEntities.map((e) => e.id);
};

const userSlice = createSlice({
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
      state.paginatedLists[listId].ids = recalcPaginatedList(
        state,
        state.paginatedLists[listId]
      );
    },
    filterPaginatedList(
      state,
      {
        payload: { listId, column, value },
      }: PayloadAction<{
        listId: string;
        column: keyof User;
        value: any;
      }>
    ) {
      state.paginatedLists[listId].filter = { column, value };
      state.paginatedLists[listId].ids = recalcPaginatedList(
        state,
        state.paginatedLists[listId]
      );
    },
  },
});

const { actions: userActions, reducer: userReducer } = userSlice;

export { userSlice, userActions, userReducer };
