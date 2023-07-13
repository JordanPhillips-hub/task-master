import styled from "styled-components";

const StyledTaskDetail = styled.div`
  p,
  span {
   font-size: 0.875rem;
  }

  p { 
   color: var(--clr-dim-gray);
   margin: 0;
  }

  span {
   color: var(--clr-black);
   font-weight: 500;
  }

  .dueDate {
   color: ${({ warningColor }) => warningColor || ''};
  }
`
export default StyledTaskDetail