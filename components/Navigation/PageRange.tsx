import { PageNavLinkProps } from "./NavLinkProps";
import { PaginationItem } from "reactstrap";
import { BaseNavLink } from "./BaseNavLink";

const PAGE_SPREAD = 4;

interface Range {
  min: number;
  max: number;
}

export const PageRange: React.FC<PageNavLinkProps> = ({ paginationOptions, maximumPage }: PageNavLinkProps) => {
  const { page, nodesPerPage } = paginationOptions;
  const { min, max }: Range = {
    min: Math.max(page - PAGE_SPREAD, 1),
    max: Math.min(page + PAGE_SPREAD, maximumPage),
  };
  const length = max >= min ? max - min + 1 : 0;
  return (
    <>
      {Array.from(Array(length), (_, index) => (
        <BaseNavLink to={min + index} perPage={nodesPerPage} key={index} />
      ))}
    </>
  );
};
