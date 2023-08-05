import styled, { css } from "styled-components";

type SharedStyleProps = {
  gap?: string;
  width?: string;
  lrg?: boolean;
  med?: boolean;
};

type StyleProps = {
  remove?: boolean;
  light?: string;
  sml?: boolean;
  select?: boolean;
};

export const sharedStyles = css<SharedStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
  width: ${({ width }) => width || "initial"};
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${({ lrg }) =>
    lrg &&
    css`
      font-size: 1rem;
      margin-inline: auto;
      padding: 0.75em 0.75em;
      border-radius: 90px;

      @media screen and (max-width: 768px) {
        font-size: 0.9rem;
      }
    `}

  ${({ med }) =>
    med &&
    css`
      font-size: 0.8rem;
      padding: 0.6em 0 0.6em;
      border-radius: 60px;
    `}
`;
export const ButtonPrimary = styled.button<StyleProps>`
  ${sharedStyles}
  background-color: var(--primary-100);
  color: var(--neutral-100);
  margin-bottom: 10px;

  &:hover,
  &:focus {
    background-color: var(--primary-400);
    border: 1px solid var(--primary-100);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }

  ${({ remove }) =>
    remove &&
    css`
      background-color: var(--trans-200);
      &:hover {
        background-color: var(--primary-300);
        border: none;
      }
    `}
`;
export const ButtonSecondary = styled.button<StyleProps>`
  ${sharedStyles}
  background-color: var(--neutral-100);
  color: var(--neutral-900);
  border: 1px solid var(--neutral-400);

  &:hover,
  &:focus {
    border: 1px solid var(--primary-400);
  }
`;
export const ButtonRound = styled.button<StyleProps>`
  ${sharedStyles}
  background-color: ${({ light }) =>
    light ? "var(--neutral-100)" : "var(--trans-100)"};
  border-radius: 50%;
  padding: 0.42em 0.42em;

  @media screen and (max-width: 768px) {
    padding: 0.25em 0.25em;
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
    border: 1px solid var(--primary-400);
  }

  ${({ sml }) =>
    sml &&
    css`
      width: 2.143em;
      height: 2.143em;

      @media screen and (max-width: 768px) {
        width: 1.8em;
        height: 1.8em;
        padding: 0.8em 0.8em;
      }
    `}

  ${({ remove }) =>
    remove &&
    css`
      &:hover {
        background-color: var(--trans-200);
        border: 1px solid var(--primary-300);
      }
    `}

  ${({ select }) =>
    select &&
    css`
      background-color: var(--neutral-100);
      border: 1px solid var(--neutral-900);
    `}
`;
export const ButtonTransparent = styled.button<StyleProps>`
  ${sharedStyles}
  background-color: ${({ remove }) =>
    remove ? "var(--trans-200)" : "var(--trans-100)"};
  color: var(--neutral-900);

  &:hover,
  &:focus {
    transform: scale(1.1);
    border: ${({ remove }) =>
      remove ? "1px solid var(--primary-300)" : "1px solid var(--primary-400)"};
  }
`;
