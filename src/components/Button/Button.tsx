import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "round" | "transparent";
  type?: string;
  sml?: boolean;
  med?: boolean;
  lrg?: boolean;
  light?: boolean;
  select?: boolean;
  remove?: boolean;
  style?: React.CSSProperties;
  width?: string;
  gap?: string;
  id?: string;
  onClick?: (e: any) => any;
};

type ButtonStyles = {
  [key: string]: React.ComponentType<any>;
};

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonRound,
  ButtonTransparent,
} from "./Button.styled";

const buttons: ButtonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  round: ButtonRound,
  transparent: ButtonTransparent,
};

const Button: React.FC<Props> = ({ children, variant, type, ...rest }) => {
  const StyledButton = buttons[variant || "primary"] || ButtonPrimary;
  return (
    <StyledButton type={type || "button"} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
