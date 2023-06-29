import styled from "styled-components";

const StyledAddNewTask = styled.form`
 button:not(section button, div > a button) {
  margin-top: 30px;
  margin-inline: auto;
 }

 h1 {
  margin-left: 73px;
 }

 label {
  font-size: 1.125rem;
  font-weight: 500;
  display: block;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
 }

 section:nth-child(5) div {
  flex: 1;
 }

 section:nth-child(6) {
  position: relative;
 }

 section:nth-child(6) button {
  position: absolute;
  top: 53%;
  right: 3%;
 }

 input[type=date],
 input[type=time] {
  width: 100%;
  padding: 12px 24px;
 }
`
export default StyledAddNewTask;