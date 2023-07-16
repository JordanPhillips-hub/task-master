/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { uid } from "uid";
import { TaskContext } from "../../contexts/TaskContext";
import StyledSelect from "./Select.styled";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";

const Select = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { handleSortOrder } = useContext(TaskContext);

  const handleSelectToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSortOptions = (index, e) => {
    setIsActive(index);
    handleSortOrder(e);
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
                id={option.toLowerCase()}
                onClick={(e) => handleSortOptions(index, e)}
              >
                {index === isActive ? (
                  <Icon type="check" fontSize="0.7rem" />
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
