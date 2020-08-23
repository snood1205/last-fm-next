import { PaginationOptions } from "../interfaces/PaginationOptions";
import { QueryUnion } from "../interfaces/QueryUnion";

const parseIntNaN = (number: string): number | null => (isNaN(parseInt(number)) ? null : parseInt(number, 10));

export const parsePaginationOptions = ({ paginationQuery: { per_page, page } }: QueryUnion): PaginationOptions => ({
  nodesPerPage: parseIntNaN(per_page as string) ?? 50,
  page: parseIntNaN(page as string) ?? 1,
});
