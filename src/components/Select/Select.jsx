/* eslint-disable react/prop-types */
import { useState } from "react";
import StyledSelect from "./Select.styled";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import Button from "../Button/Button";

const createOption = (label) => {
  const value = label.toLowerCase();
  return { label: label, value };
};

export const sortOptions = [
  "Default",
  "Ascending Date",
  "Descending Date",
  "Ascending Complexity",
  "Descending Complexity",
  "Ascending Priority",
  "Descending Priority",
].map((label) => ({ ...createOption(label), name: "sort" }));

export const categoryOptions = [
  "Education",
  "Career",
  "Job",
  "Success",
  "Routine",
  "Morning Task",
  "Medicine",
].map((label) => ({ ...createOption(label), name: "category" }));

const Select = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectToggle = () => {
    setIsOpen((prevState) => !prevState);
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
            <li key={option.value}>
              <Input
                label={option.label}
                id={option.value}
                type="radio"
                // name={option.name}
                value={option.value}
              />
            </li>
          ))}
        </StyledSelect>
      )}
    </div>
  );
};

export default Select;
