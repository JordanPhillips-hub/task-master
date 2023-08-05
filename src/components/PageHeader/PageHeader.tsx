import React from "react";
import { Link } from "react-router-dom";
import StyledPageHeader from "./PageHeader.styled";
import Header from "../Header/Header";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

type Props = {
  text: string;
};

const PageHeader: React.FC<Props> = ({ text }) => {
  return (
    <StyledPageHeader>
      <Link to="/">
        <Button variant="round" light>
          <Icon type="arrowLeft" />
        </Button>
      </Link>

      <Header lrg text={text} />
    </StyledPageHeader>
  );
};

export default PageHeader;
