import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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