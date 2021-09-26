import { createSelector } from "reselect";
import { memoize } from "lodash";
import { UserState } from "./types";

const getUserState = ({ user }: { user: UserState }) => user;

export const getUsers = createSelector(getUserState, (userState) =>
  memoize((listId: string) => userState.paginatedLists[listId]?.ids?.map(id => userState.entityStore[id]))
);
