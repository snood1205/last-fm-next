import { BaseNavLink } from "./BaseNavLink";
import { NavLinkProps } from "./NavLinkProps";

export const FirstNavLink: React.FC<NavLinkProps> = ({ paginationOptions: { page, nodesPerPage } }: NavLinkProps) => (
  <BaseNavLink first to={1} perPage={nodesPerPage} disabled={page === 1} />
);
