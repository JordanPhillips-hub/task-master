import styled from "styled-components";

type StyleProps = {
  warningColor: string;
};

const StyledTaskDetail = styled.div<StyleProps>`
  p,
  span {
    font-size: 0.875rem;
  }

  p {
    color: var(--neutral-500);
    margin: 0;
  }

  span {
    color: var(--neutral-900);
    font-weight: 500;
  }

  .dueDate {
    color: ${({ warningColor }) => warningColor || ""};
  }
`;
export default StyledTaskDetail;
