import Link from "next/link";

interface Props {
  disabled?: boolean;
  ariaLabel?: string;
  text?: string;
  href: string;
  to: number;
}

export type LIALProps = Props;

export const ListItemAndLink: React.FC<Props> = ({ ariaLabel, disabled, href, text, to }: Props) => (
  <li className="page-item">
    <Link href={href}>
      <a className="page-link" aria-disabled={disabled} aria-label={ariaLabel}>
        {text ?? to}
      </a>
    </Link>
  </li>
);
