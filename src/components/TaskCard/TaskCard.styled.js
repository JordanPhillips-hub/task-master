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
    color: var(--clr-dim-gray);
    font-size: 0.875rem;
    margin: 0;
  }

  .buttonIcon {
    font-size: 1.3rem;
  }

  .detailsIcon {
    font-size: 1.125rem;
  }
`
export default StyledTaskCard;