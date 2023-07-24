/* eslint-disable react/prop-types */
import { useState } from "react";
import { uid } from "uid";
import StyledSelect from "./Select.styled";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";

const Select = ({ name, options, onClick, isActive }) => {
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
          {options.map((option, index) => (
            <li key={uid()}>
              <small>{option}</small>
              <Button
                variant="round"
                select
                id={option}
                onClick={(e) => onClick(e, index)}
                style={
                  index === isActive
                    ? { padding: "0.05em 0.05em" }
                    : { padding: "0.4em 0.4em" }
                }
              >
                {index === isActive ? (
                  <Icon type="check" fontSize="inherit" />
                ) : null}
              </Button>
            </li>
          ))}
        </StyledSelect>
      )}
    </div>
  );
};

export default Select;
