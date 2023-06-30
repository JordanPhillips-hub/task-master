import styled from "styled-components";

const LevelIndicator = styled.div`
  background-color: ${({ priorityColor }) => priorityColor};
  width: 18px;
  height: 18px;
  border-radius: 50%;
`
export default LevelIndicator;