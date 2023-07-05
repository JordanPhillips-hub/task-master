/* eslint-disable react/prop-types */
import StyledInput from "./StyledInput.styled";

const Input = ({ id, label, type, ...rest }) => {
  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <StyledInput id={id} type={type ? type : "text"} name={id} {...rest} />
    </>
  );
};

export default Input;
