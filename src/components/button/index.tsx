import React from "react";

// Styles
import "./button.scss";

interface Props {
  id?: string;
  children: any;
  className?: string;
  variant?: "filled" | "outlined" | "link" | string | undefined;
  color?: "orange" | "pink" | "teal" | undefined;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  testId?: string;
  rel?: string;
  target?: string;
  ariaHidden?: boolean;
  role?: string;
  onClick?: (event: any) => void;
}

const Button: React.FC<Props> = ({
  id,
  children,
  className,
  variant = "filled",
  color = "orange",
  disabled,
  href,
  type,
  loading,
  testId,
  rel,
  target,
  ariaHidden,
  role,
  onClick,
}) => {
  const baseClass = "button";
  const colorClass = `button--${color}`;
  const variantClass = `button--${variant}`;
  const loadingClass = loading ? "button--loading" : "";
  const classes = [baseClass, colorClass, loadingClass, variantClass, className].filter(Boolean).join(" ");

  const Element = href ? "a" : "button";

  const handleClick = (event: any) => {
    if (!href) {
      event.preventDefault();
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Element
      id={id}
      className={classes}
      disabled={disabled || loading}
      href={href}
      onClick={handleClick}
      type={type}
      data-testid={testId || "button"}
      rel={rel}
      target={target}
      aria-hidden={ariaHidden}
      role={role}
    >
      <span
        className="button__content"
        data-testid="button-content"
      >
        {children}
      </span>
    </Element>
  );
};

export default Button;
