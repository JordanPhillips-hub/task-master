import styled from "styled-components";

const StyledProgressBar = styled.div`
  background-color: hsla(0, 0%, 18%, 0.05);
  width: 100%;
  height: 0.75em;
  border-radius: 33px;

  && > div {
    background-color: var(--clr-sky-blue);
    height: 100%;
    border-radius: 33px;
    transition: width 0.5s ease-out;
  }
`

export default StyledProgressBar;


