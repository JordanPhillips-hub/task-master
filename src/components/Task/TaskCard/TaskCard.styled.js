import styled from "styled-components";

const StyledTaskCard = styled.div`
  position: relative;
  background-color: ${({ complete }) => complete ? 'var(--clr-pale-green)' : 'var(--clr-white)'};
  margin-bottom: 24px;
  padding: 20px 14px 6px 14px;
  border-radius: 18px;
  border: ${({ complete }) => complete ? '1px solid var(--clr-light-green)' : 'none'};

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
      color: var(--clr-black);
    }
  }
`
export default StyledTaskCard;