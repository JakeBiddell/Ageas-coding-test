export type PaginatedList<Entity> = {
  ids: number[];
  sort: {
    column: keyof Entity;
    direction: "asc" | "desc";
  };
  filter: {
    column: keyof Entity;
    value: any;
  };
};
