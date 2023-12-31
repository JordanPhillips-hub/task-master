import styled from "styled-components";

type StyleProps = {
  warningColor: string;
};

export const FlatProgressBar = styled.div<StyleProps>`
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
`;
export const RoundProgressBar = styled.div<StyleProps>`
  position: absolute;
  right: -10px;
  bottom: 20px;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress-ring__background {
    stroke: var(--neutral-300);
  }

  .progress-ring__circle {
    stroke: ${({ warningColor }) => warningColor};
    transition: stroke-dashoffset 0.5s ease-in-out;
  }

  .progress-ring__text {
    color: black;
    fill: var(--neutral-900);
    font-size: 0.75rem;
  }
`;
