/* eslint-disable react/prop-types */
import { ButtonPrimary, ButtonSecondary, ButtonRound } from "./Button.styled";

const buttonStyles = {
  primary: ButtonPrimary,
  secondary: ButtonSecondary,
  round: ButtonRound,
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
