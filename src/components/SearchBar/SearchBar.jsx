import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Icon type="search" />
      </SearchIcon>

      <Input label="Search" id="search" placeholder="Search..." />

      <Button variant="round">
        <Icon type="arrowRight" />
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
