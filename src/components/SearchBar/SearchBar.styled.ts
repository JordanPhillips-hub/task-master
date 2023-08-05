import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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
  display: flex;
  align-items: center;
  position: absolute;
  left: 5%;

  @media screen and (max-width: 768px) {
    left: 3.5%;
  }
`;