import styled from "styled-components";

export const FlatProgressBar = styled.div`
  background-color: hsla(0, 0%, 18%, 0.05);
  width: 100%;
  height: 0.75em;
  border-radius: 33px;

  && > div {
    background-color: ${({ warningColor }) => warningColor};
    height: 100%;
    border-radius: 33px;
    transition: width 0.5s ease-out;
  }
`
export const RoundProgressBar = styled.div`
  position: absolute;
  right: -10px;
  bottom: 20px;

  .progress-ring {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-ring__background {
    stroke: var(--clr-progress-bar-bg);
  }

  .progress-ring__circle {
    stroke: ${({ warningColor }) => warningColor};
    transition: stroke-dashoffset 0.5s ease-in-out;
  }

  .progress-ring__text {
    fill: var(--clr-black);
    font-size: 0.75rem;
  }
`