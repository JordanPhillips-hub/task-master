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

 section:nth-child(5) > div button {
  position: absolute;
  right: 3%;
 }

  section:nth-child(6)  {
    margin-bottom: 30px;
 }


 input[type=date],
 input[type=time] {
  width: 100%;
  padding: 12px 24px;
 }

`
export default StyledAddNewTask;