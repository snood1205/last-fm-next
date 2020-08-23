import { PaginationOptions } from "../../lib/interfaces/PaginationOptions";

export interface NavLinkProps {
  paginationOptions: PaginationOptions;
}

export interface PageNavLinkProps extends NavLinkProps {
  maximumPage: number;
}
