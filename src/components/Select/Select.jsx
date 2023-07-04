/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import StyledSelect from "./Select.styled";
import Input from "../Input/Input.styled";
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
        <BsChevronDown style={isOpen && { transform: "rotate(180deg)" }} />
      </Button>

      {isOpen && (
        <StyledSelect name={name} id={name}>
          {options.map((option) => (
            <li key={option.value}>
              <label htmlFor={option.value}>{option.label}</label>
              <Input
                id={option.value}
                htmlFor={option.value}
                type="radio"
                name={option.name}
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
