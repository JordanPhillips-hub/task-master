import React from "react";
import { SearchContainer, SearchIcon } from "./SearchBar.styled";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
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
