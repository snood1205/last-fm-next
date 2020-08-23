import { BaseNavLink } from "./BaseNavLink";
import { NavLinkProps } from "./NavLinkProps";

export const PrevNavLink: React.FC<NavLinkProps> = ({ paginationOptions: { page, nodesPerPage } }: NavLinkProps) => (
  <BaseNavLink previous to={page - 1} perPage={nodesPerPage} disabled={page === 1} />
);
