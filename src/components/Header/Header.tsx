import React from "react";

type Props = {
  lrg?: boolean;
  text?: string;
};

const Header: React.FC<Props> = ({ lrg, text }) => {
  return <header>{lrg ? <h1>{text}</h1> : <h2>{text}</h2>}</header>;
};

export default Header;
