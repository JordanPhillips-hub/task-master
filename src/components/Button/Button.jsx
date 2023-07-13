/* eslint-disable react/prop-types */
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonRound,
  ButtonTransparent,
} from "./Button.styled";

const buttonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  round: ButtonRound,
  transparent: ButtonTransparent,
};

const Button = ({ children, variant, type, ...rest }) => {
  const StyledButton = buttonStyles[variant] || ButtonPrimary;
  return (
    <StyledButton type={type || "button"} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
