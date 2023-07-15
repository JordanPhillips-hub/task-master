/* eslint-disable react/prop-types */
import { useState } from "react";
import { uid } from "uid";
import StyledSelect from "./Select.styled";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";

const Select = ({ name, options, onClick }) => {
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
        <StyledSelect name={name} id={uid()}>
          {options.map((option) => (
            <li key={uid()}>
              <Button id={option.toLowerCase()} onClick={onClick}>
                {option}
              </Button>
            </li>
          ))}
        </StyledSelect>
      )}
    </div>
  );
};

export default Select;
