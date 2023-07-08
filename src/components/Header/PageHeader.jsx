/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StyledPageHeader from "./PageHeader.styled";
import Header from "./Header";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";

const PageHeader = ({ text }) => {
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
