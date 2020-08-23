import { BaseNavLink } from "./BaseNavLink";
import { PageNavLinkProps } from "./NavLinkProps";

export const NextNavLink: React.FC<PageNavLinkProps> = ({
  paginationOptions: { page, nodesPerPage },
  maximumPage,
}: PageNavLinkProps) => <BaseNavLink to={page + 1} perPage={nodesPerPage} disabled={page === maximumPage} next />;
