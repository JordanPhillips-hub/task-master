import styled from "styled-components";

const StyledInput = styled.input`
  color: var(--clr-dim-grey);
  font-family: "Manrope", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid var(--neutral-400);
  border-radius: 60px;

  :hover,
  :focus {
    border: 1px solid var(--primary-400);
  }

&[type=text] {
  width: 100%;
  padding: 1em 10.6em 1em 3em;
}
`

export default StyledInput;