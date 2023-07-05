import styled from "styled-components";

const StyledInput = styled.input`
  color: var(--clr-dim-grey);
  font-family: "Manrope", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid var(--clr-light-gray);
  border-radius: 60px;

  :hover,
  :focus {
    border: 1px solid var(--clr-deep-sky-blue);
  }

&[type=text] {
  width: 100%;
  padding: 1em 10.6em 1em 3em;
}

&[type=radio] {
  background-color: var(--clr-white);
  color: var(--clr-black);
  appearance: none;
  font: inherit;
  display: grid;
  place-content: center;
}

&[type=radio],
&[type=radio]::before {
  width: 1.22em;
  height: 1.22em;
  border: 1px solid var(--clr-black);
  border-radius: 50%;
}

&[type=radio]::before {
  content: "";
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--clr-black);
}

&[type=radio]:checked::before {
  transform: scale(0.6);
}
`

export default StyledInput;