import styled from "styled-components";
import { tagColors } from './TagColors'

const TaskTag = styled.div`
 background-color: ${() => tagColors[Math.floor(Math.random() * tagColors.length)]};
 font-size: 0.75rem;
 font-weight: 400;
 display: flex;
 align-items: center;
 justify-content: center;
 min-width: 40px;
 padding: 0.1em 0.5em;
 border-radius: 0.3em;
 box-shadow: inset 0 -0.075em 0 rgba(0,0,0,0.2);
`
export default TaskTag;