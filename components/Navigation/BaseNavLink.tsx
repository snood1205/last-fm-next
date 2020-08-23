import Link from "next/link";
import { LIALProps, ListItemAndLink } from "./ListItemAndLink";

interface Props {
  disabled?: boolean;
  first?: boolean;
  last?: boolean;
  next?: boolean;
  perPage: number;
  previous?: boolean;
  to: number;
}

const determineAriaLabel = (
  first?: boolean,
  last?: boolean,
  next?: boolean,
  previous?: boolean,
): string | undefined => {
  if (first) return "First";
  if (last) return "Last";
  if (next) return "Next";
  if (previous) return "Previous";
};

const determineText = (first?: boolean, last?: boolean, next?: boolean, previous?: boolean): string | undefined => {
  if (first) return "«";
  if (last) return "»";
  if (next) return "›";
  if (previous) return "‹";
};

export const BaseNavLink: React.FC<Props> = ({ disabled, first, last, next, perPage, previous, to }: Props) => {
  const ariaLabel = determineAriaLabel(first, last, next, previous);
  const text = determineText(first, last, next, previous);
  const href = disabled ? "" : `/page/${to}?per_page=${perPage}`;
  const lialProps: LIALProps = {
    disabled,
    ariaLabel,
    text,
    to,
    href,
  };
  return <ListItemAndLink {...lialProps} />;
};
