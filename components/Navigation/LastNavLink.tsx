import { BaseNavLink } from "./BaseNavLink";
import { PageNavLinkProps } from "./NavLinkProps";

export const LastNavLink: React.FC<PageNavLinkProps> = ({
  paginationOptions: { page, nodesPerPage },
  maximumPage,
}: PageNavLinkProps) => <BaseNavLink to={maximumPage} perPage={nodesPerPage} disabled={page === maximumPage} last />;
