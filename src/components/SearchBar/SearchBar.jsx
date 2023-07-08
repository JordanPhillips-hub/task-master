import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "src/components/Input/Input";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";

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
