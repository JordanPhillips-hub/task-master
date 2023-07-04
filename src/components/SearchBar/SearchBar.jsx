import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input.styled";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { InputContainer } from "../../App.styles";

const SearchBar = () => {
  return (
    <SearchContainer>
      <InputContainer>
        <SearchIcon>
          <Icon type="search" />
        </SearchIcon>

        <Input
          htmlFor="search"
          label="Search"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
        />

        <Button variant="round">
          <Icon type="arrowRight" fontSize="1.5rem" />
        </Button>
      </InputContainer>
    </SearchContainer>
  );
};

export default SearchBar;
