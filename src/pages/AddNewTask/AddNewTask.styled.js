import styled from "styled-components";

const StyledAddNewTask = styled.form`

label {
  font-size: 1.125rem;
  font-weight: 500;
  display: block;
  margin: 0.83em 0;
 }

 section:nth-child(4) div {
  flex: 1;
 }

 section:nth-child(5) button {
  position: absolute;
  right: 3%;
 }

 input[type=date],
 input[type=time] {
  width: 100%;
  padding: 12px 24px;
 }

 button[type=submit] {
  margin-top: 30px;
 }

 li {
  margin-bottom: 6px;
 }
`
export default StyledAddNewTask;