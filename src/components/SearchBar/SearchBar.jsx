/* eslint-disable react/prop-types */
import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "src/components/Input/Input";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";

const SearchBar = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Icon type="search" />
      </SearchIcon>

      <Input
        label="Search"
        id="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />

      <Button variant="round">
        <Icon type="arrowRight" />
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
