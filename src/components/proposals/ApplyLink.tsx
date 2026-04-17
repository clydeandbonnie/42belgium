/**
 * External link to the 42 Belgium admission sign-up page.
 * Always opens in a new tab with noopener/noreferrer for security.
 */

export const APPLY_URL = "https://admission.42belgium.be/en/users/sign_up";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ApplyLink({ children, className }: Props) {
  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
