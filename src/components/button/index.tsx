import React from "react";

// Styles
import "./button.scss";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outlined" | "link" | "heading" | "plain" | "icon-start" | string | undefined;
  color?: "blue" | "orange" | "pink" | "teal" | "red" | "purple" | undefined;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
  testId?: string;
  rel?: string;
  target?: string;
  ariaHidden?: boolean;
  role?: string;
  onClick?: (event: MouseEvent) => void;
  tabIndex?: number;
}

const Button: React.FC<Props> = ({
  id,
  children,
  className,
  variant = "filled",
  color = "default",
  disabled,
  href,
  type,
  testId,
  rel,
  target,
  ariaHidden,
  role = "button",
  onClick,
  tabIndex,
}) => {
  // Class Definitions
  const baseClass = "button";
  const colorClass = `button--${color}`;
  const variantClass = `button--${variant}`;
  const classes = [baseClass, colorClass, variantClass, className].filter(Boolean).join(" ");

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
      disabled={disabled}
      href={href}
      onClick={handleClick}
      type={type}
      data-testid={testId || "button"}
      rel={rel}
      target={target}
      aria-hidden={ariaHidden}
      role={role}
      tabIndex={tabIndex}
    >
      {variant === "null" ? (
        children
      ) : (
        <span
          className="button__content"
          data-testid="button-content"
        >
          {children}
        </span>
      )}
    </Element>
  );
};

export default Button;
