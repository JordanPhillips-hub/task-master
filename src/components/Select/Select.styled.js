import styled from "styled-components";

const StyledSelect = styled.ul`
background-color: var(--clr-white);
position: absolute;
width: 185px;
margin-top: 5px;
padding: 13px 14px;
border-radius: 14px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 16px 45px;
z-index: 100;

  li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--clr-black);
  padding-top: 9px;
  padding-bottom: 9px;

  input {
    cursor: pointer;
  }
  
  &:last-child {
    border-bottom: 0px;
    padding-bottom: 0;
  }
}
`
export default StyledSelect;