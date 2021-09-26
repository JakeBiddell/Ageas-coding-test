import { PaginatedList, User } from "../../Types";

export type UserState = {
    entityStore: { [key: number]: User };
    loading: boolean;
    paginatedLists: { [id: string]: PaginatedList<User> };
    error: string | undefined;
  };