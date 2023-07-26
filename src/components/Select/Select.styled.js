import styled from "styled-components";

const StyledSelect = styled.ul`
background-color: var(--neutral-100);
position: absolute;
width: 185px;
margin-top: 5px;
border-radius: 14px;
box-shadow: 0px 16px 45px rgba(0, 0, 0, 0.16);
z-index: 100;

@media screen and (max-width: 768px) {
  width: 155px;
  margin-inline: auto;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--neutral-900);
  padding: 9px;

  small {
    font-size: 0.75rem;
    @media screen and (max-width: 768px) {
      font-size: 0.62rem;
}
  }

  input {
    cursor: pointer;
  }

  svg {
    pointer-events: none;
  }
  
  &:last-child {
    border-bottom: 0px;
    padding-bottom: 9px;
  }
}
`
export default StyledSelect;