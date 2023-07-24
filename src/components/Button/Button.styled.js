import styled, { css } from "styled-components";

export const sharedStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
  width: ${({ width }) => width || 'initial'};
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${({ lrg }) => lrg && css`
    font-size: 1.125rem;
    margin-inline: auto;
    padding: 1em 1em;
    border-radius: 90px;
  `}

  ${({ med }) => med && css`
    font-size: 0.875rem;
    padding: 0.857em 0 0.857em;
    border-radius: 60px;
  `}
`
export const ButtonPrimary = styled.button`
 ${sharedStyles}
  background-color: var(--primary-100);
  color: var(--neutral-100);

  &:hover,
  &:focus {
    background-color: var(--primary-400);
    border: 1px solid var(--primary-100);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }

  ${({ remove }) => remove && css`
    background-color: var(--trans-200);
    &:hover {
      background-color: var(--primary-300);
      border: none;
    }
  `}
`
export const ButtonSecondary = styled.button`
  ${sharedStyles}
  background-color: var(--neutral-100);
  color: var(--neutral-900);
  border: 1px solid var(--neutral-400);

  &:hover,
  &:focus {
    border: 1px solid var(--primary-400);
  }
`
export const ButtonRound = styled.button`
  ${sharedStyles}
  background-color: ${({ light }) => light
    ? 'var(--neutral-100)'
    : 'var(--trans-100)'};
  border-radius: 50%;
  padding: 0.42em 0.42em;
  

  &:hover,
  &:focus {
    transform: scale(1.1);
    border: 1px solid var(--primary-400);
  }

  ${({ sml }) => sml && css`
    width: 2.143em;
    height: 2.143em;
  `}

  ${({ remove }) => remove && css`
    background-color: var(--trans-200);
    &:hover {
      background-color: var(--primary-300);
      border: none;
    }
  `}

  ${({ select }) => select && css`
    background-color: var(--neutral-100);
    border: 1px solid var(--neutral-900);
  `}
`
export const ButtonTransparent = styled.button`
  ${sharedStyles}
  background-color: ${({ remove }) => remove ? 'var(--trans-200)' : 'var(--trans-100)'};
  color: var(--neutral-900);

  &:hover,
  &:focus {
    transform: scale(1.1);
    border: ${({ remove }) => remove ? '1px solid var(--primary-300)' : '1px solid var(--primary-400)'} ;
  }
`