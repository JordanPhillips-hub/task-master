import styled from "styled-components";

const StyledTaskCard = styled.div`
  background-color: var(--clr-white);
  margin-bottom: 24px;
  padding: 20px 14px;
  border-radius: 18px;

  h2 {
    font-size: 1rem;
    margin: 0;
  }

  p {
    font-size: 0.875rem;
    color: var(--clr-dim-gray);
    margin: 0;
  }

  span {
    color: var(--clr-black);
    font-weight: 500;
  }

  .dueDate {
    color: ${({ priorityColor }) => priorityColor || ''};
  }
`
export default StyledTaskCard;