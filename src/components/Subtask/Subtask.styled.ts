import styled from "styled-components";

type StyleProps = {
  complete: boolean;
};

const StyledSubtask = styled.li<StyleProps>`
  background-color: var(--neutral-100);
  margin-bottom: 10px;
  padding: 0.85em 10.6em 0.85em 3em;
  border-radius: 90px;
  width: 100%;
  text-decoration: ${({ complete }) => (complete ? "line-through" : "none")};

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  button {
    background-color: ${({ complete }) =>
      complete ? "var(--primary-100)" : "var(--trans-100)"};
    position: absolute;
    left: 167%;

    @media screen and (max-width: 768px) {
      left: 143%;
    }
  }

  svg {
    color: ${({ complete }) =>
      complete ? "var(--neutral-100)" : "var(--neutral-900)"};
  }
`;
export default StyledSubtask;
