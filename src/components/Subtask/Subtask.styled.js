import styled from "styled-components";

const StyledSubtask = styled.li`
  background-color: var(--clr-white);
  margin-bottom: 10px;
  padding: 0.85em 10.6em 0.85em 3em;  
  border-radius: 90px;
  width: 100%;
  text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};

  button {
    background-color: ${({ complete }) => complete ? 'var(--clr-sky-blue)' : 'var(--clr-light-blue-transparent)'};
    position: absolute;
    left: 167%;
  }

  svg {
    color: ${({ complete }) => complete ? 'var(--clr-white)' : 'var(--clr-black)'}
  }
`
export default StyledSubtask;