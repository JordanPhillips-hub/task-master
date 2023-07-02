import styled from "styled-components";

export const SearchContainer = styled.div`
  margin-bottom: 18px;

  & label {
    display: none;  
  }

  & button {
    position: absolute;
    right: 2%;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 5%;
`;