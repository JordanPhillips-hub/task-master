import styled from "styled-components";

const StyledTaskCard = styled.div`
  background-color: var(--clr-white);
  margin-bottom: 24px;
  padding: 20px 14px 6px 14px;
  border-radius: 18px;

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