import { CiSearch } from "react-icons/ci";
import { BsArrowRightShort } from "react-icons/bs";
import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input.styled";
import Button from "../Button/Button.styled";
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

        <Button round type="button">
          <BsArrowRightShort fontSize="1.5rem" />
        </Button>
      </InputContainer>
    </SearchContainer>
  );
};

export default SearchBar;
