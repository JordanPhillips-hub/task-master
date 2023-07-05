import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input";
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

        <Input label="Search" id="search" placeholder="Search..." />

        <Button variant="round">
          <Icon type="arrowRight" />
        </Button>
      </InputContainer>
    </SearchContainer>
  );
};

export default SearchBar;
