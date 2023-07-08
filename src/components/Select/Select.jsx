/* eslint-disable react/prop-types */
import { useState } from "react";
import StyledSelect from "./Select.styled";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";

export const sortOptions = [
  "Default",
  "Ascending Date",
  "Descending Date",
  "Ascending Complexity",
  "Descending Complexity",
  "Ascending Priority",
  "Descending Priority",
];

const Select = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toLower = (val) => {
    return val.toLowerCase();
  };

  return (
    <div>
      <Button
        variant="secondary"
        med
        width="100%"
        gap="24px"
        onClick={handleSelectToggle}
      >
        {name}
        <Icon
          type="arrowDown"
          style={isOpen && { transform: "rotate(180deg)" }}
        />
      </Button>

      {isOpen && (
        <StyledSelect name={name} id={name}>
          {options.map((option) => (
            <li key={option}>
              <Input
                label={option}
                id={toLower(option)}
                type="checkbox"
                value={option}
              />
            </li>
          ))}
        </StyledSelect>
      )}
    </div>
  );
};

export default Select;
