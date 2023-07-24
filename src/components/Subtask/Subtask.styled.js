import styled from "styled-components";

const StyledSubtask = styled.li`
  background-color: var(--neutral-100);
  margin-bottom: 10px;
  padding: 0.85em 10.6em 0.85em 3em;  
  border-radius: 90px;
  width: 100%;
  text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};

  button {
    background-color: ${({ complete }) => complete ? 'var(--primary-100)' : 'var(--trans-100)'};
    position: absolute;
    left: 167%;
  }

  svg {
    color: ${({ complete }) => complete ? 'var(--neutral-100)' : 'var(--neutral-900)'}
  }
`
export default StyledSubtask;