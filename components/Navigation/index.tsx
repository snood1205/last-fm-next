import { Pagination, PaginationItem } from "reactstrap";
import { FirstNavLink } from "./FirstNavLink";
import { PrevNavLink } from "./PrevNavLink";
import { PageRange } from "./PageRange";
import { NextNavLink } from "./NextNavLink";
import { LastNavLink } from "./LastNavLink";
import { PaginationOptions } from "../../lib/interfaces/PaginationOptions";

interface Props {
  paginationOptions: PaginationOptions;
  maximumPage: number;
}

export const Navigation: React.FC<Props> = ({ paginationOptions, maximumPage }: Props) => (
  <Pagination>
    <FirstNavLink paginationOptions={paginationOptions} />
    <PrevNavLink paginationOptions={paginationOptions} />
    <PageRange paginationOptions={paginationOptions} maximumPage={maximumPage} />
    <NextNavLink paginationOptions={paginationOptions} maximumPage={maximumPage} />
    <LastNavLink paginationOptions={paginationOptions} maximumPage={maximumPage} />
  </Pagination>
);
