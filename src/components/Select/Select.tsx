import React, { useState } from "react";
import { uid } from "uid";
import { motion } from "framer-motion";
import StyledSelect from "./Select.styled";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

type Props = {
  name: string;
  options: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  isActive: string | number | null;
};

const Select: React.FC<Props> = ({ name, options, isActive, onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <motion.div
          animate={{ y: 5 }}
          transition={{
            type: "spring",
            stiffness: 500,
          }}
          style={{ position: "relative", zIndex: 100 }}
        >
          <StyledSelect id={uid()}>
            {options.map((option, index) => (
              <li key={uid()}>
                <small>{option}</small>
                <Button
                  variant="round"
                  select
                  id={option}
                  onClick={(e) => onClick(e, index)}
                  style={
                    isActive === index
                      ? { padding: "0.05em 0.05em" }
                      : { padding: "0.4em 0.4em" }
                  }
                >
                  {isActive === index ? (
                    <Icon type="check" fontSize="inherit" />
                  ) : null}
                </Button>
              </li>
            ))}
          </StyledSelect>
        </motion.div>
      )}
    </div>
  );
};

export default Select;
