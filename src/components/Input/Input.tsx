import React from "react";
import StyledInput from "./StyledInput.styled";

type Props = {
  id: string;
  label?: String;
  type?: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (() => void) | undefined;
};

const Input: React.FC<Props> = ({ id, label, type, ...rest }) => {
  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <StyledInput id={id} type={type ? type : "text"} name={id} {...rest} />
    </>
  );
};

export default Input;
