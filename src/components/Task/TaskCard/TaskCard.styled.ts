import styled from "styled-components";

type StyleProps = {
  complete: boolean;
};

const StyledTaskCard = styled.div<StyleProps>`
  position: relative;
  background-color: ${({ complete }) =>
    complete ? "var(--secondary-100)" : "var(--neutral-100)"};
  width: 340px;
  margin-bottom: 10px;
  padding: 20px 14px 6px 14px;
  border-radius: 18px;
  border: ${({ complete }) =>
    complete ? "1px solid var(--secondary-200)" : "none"};

  header {
    text-decoration: ${({ complete }) => (complete ? "line-through" : "none")};
  }

  h2 {
    font-size: 1rem;
  }

  small {
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-decoration: underline;
  }

  a {
    &:hover,
    &:focus {
      outline: none;
      color: var(--neutral-900);
    }
  }
`;
export default StyledTaskCard;
