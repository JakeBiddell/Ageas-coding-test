export type SortDirection = "asc" | "desc";

export type PaginatedList<Entity> = {
  ids: number[];
  sort?: {
    column: keyof Entity;
    direction: SortDirection;
  };
  filter?: {
    column: keyof Entity;
    value: any;
  };
};
