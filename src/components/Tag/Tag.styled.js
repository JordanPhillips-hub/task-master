import styled from "styled-components";

const tagColors =
  ["var(--clr-light-beige)", "var(--clr-mint-green)", "var(--clr-light-cyan)"];

const Tag = styled.div`
  background-color: ${() => tagColors[Math.floor(Math.random() * tagColors.length)]};
  font-size: 0.75rem;
  font-weight: 400;
  padding: 0.375em 0.5em;
  border-radius: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

`

export default Tag;