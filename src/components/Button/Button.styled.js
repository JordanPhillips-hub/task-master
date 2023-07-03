import styled, { css } from "styled-components";

const Button = styled.button`
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

  ${({ dark }) => dark && css`
    background-color: var(--clr-sky-blue);
    color: var(--clr-white);

    &:hover,
    &:focus {
      background-color: var(--clr-deep-sky-blue);
      border: 1px solid var(--clr-sky-blue);
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
      transform: translateY(-3px);
    }
  `}

  ${({ light }) => light && css`
    background-color: var(--clr-white);
    color: var(--clr-mostly-black);
    border: 1px solid var(--clr-light-gray);

    &:hover,
    &:focus {
      border: 1px solid var(--clr-deep-sky-blue);
    }
  `}

  ${({ round }) => round && css`
    background-color: ${({ light }) => light ? 'var(--clr-white)' : 'var(--clr-light-blue-transparent)'} };
    padding: 0.25em 0.25em;
    border-radius: 50%;
    padding: 0.42em 0.42em;

    &:hover,
    &:focus {
      transform: scale(1.1);
      border: 1px solid var(--clr-deep-sky-blue);
    }

    ${({ sml }) => sml && css`
      width: 2.143em;
      height: 2.143em;
    `}

    ${({ remove }) => remove && css`
      background-color: var(--clr-light-red-transparent);

      &:hover {
        border: 1px solid var(--clr-red-orange);
      }
    `}
  `}
`

export default Button;