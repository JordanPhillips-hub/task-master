/* eslint-disable react/prop-types */
const Header = ({ lrg, text }) => {
  return <header>{lrg ? <h1>{text} </h1> : <h2>{text}</h2>}</header>;
};

export default Header;
