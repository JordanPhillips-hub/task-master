import styled from "styled-components";

const StyledTaskCard = styled.div`
  position: relative;
  background-color: ${({ complete }) => complete ? 'var(--secondary-100)' : 'var(--neutral-100)'};
  margin-bottom: 24px;
  padding: 20px 14px 6px 14px;
  border-radius: 18px;
  border: ${({ complete }) => complete ? '1px solid var(--secondary-200)' : 'none'};

  header {
    text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};
  }

  small {
    display: inline-block;
    margin-top: 15px;
    text-decoration: underline;
  }

  a {
    &:hover,
    &:focus {
      outline: none;
      color: var(--neutral-900);
    }
  }
`
export default StyledTaskCard;