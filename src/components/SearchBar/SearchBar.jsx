import { CiSearch } from "react-icons/ci";
import { BsArrowRightShort } from "react-icons/bs";
import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input.styled";
import { ButtonRound } from "../Button/Button.styled";
import { InputContainer } from "../../App.styles";

const SearchBar = () => {
  return (
    <SearchContainer>
      <InputContainer>
        <SearchIcon>
          <CiSearch />
        </SearchIcon>

        <Input
          htmlFor="search"
          label="Search"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
        />

        <ButtonRound type="button">
          <BsArrowRightShort fontSize="1.5rem" />
        </ButtonRound>
      </InputContainer>
    </SearchContainer>
  );
};

export default SearchBar;
