import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope&family=Poppins:wght@500&display=swap");

:root {
  --clr-white: hsl(0, 0%, 100%);
  --clr-off-white: hsl(0, 0%, 96%);
  --clr-very-light-gray: hsl(0, 0%, 85%);
  --clr-progress-bar-bg: hsl(0, 0%, 88%);
  --clr-light-gray: hsl(0, 0%, 89%);
  --clr-dim-gray: hsl(0, 0%, 44%);
  --clr-light-beige: hsl(37, 100%, 95%);
  --clr-pale-coral: hsl(7, 100%, 96%);
  --clr-pale-green: 	hsl(120, 100%, 97%);
  --clr-light-green: hsl(120, 100%, 95%);
  --clr-mint-green: hsl(110, 100%, 95%);
  --clr-light-cyan: hsl(183, 100%, 95%);
  --clr-light-blue-gray: hsl(205, 57%, 92%); 
  --clr-black: hsl(0, 0%, 0%);
  --clr-red-orange: hsl(4, 100%, 60%);
  --clr-bright-orange: hsl(29, 99%, 51%);
  --clr-navy-blue: hsl(217, 100%, 17%);
  --clr-deep-sky-blue:  hsl(205, 100%, 40%);
  --clr-sky-blue: hsl(205, 100%, 53%);
  --clr-light-blue-transparent: hsla(205, 100%, 53%, 0.1);
  --clr-light-red-transparent: hsla(4, 100%, 60%, 0.1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html:focus-within { 
  scroll-behavior: smooth; 
}

body { 
  background-color: var(--clr-off-white);
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 1.5; 
  text-rendering: optimizeSpeed; 
  min-height: 100vh; 
}

h1 {
  font-size: 1.5rem;
}

h1,
h2 {
  color: var(--clr-black);
  font-weight: 500;
}

h2 {
  font-size: 1.125rem;
  margin-bottom: 7px;
}

ul, 
ol { 
  list-style: none;
  padding: 0;
  margin: 0;
}

img, 
picture { 
  max-width: 100%; 
  height: auto;
}

input:focus {
  outline: none
}

a {
  color: var(--clr-sky-blue);
  text-decoration: none;
}
`

export const Main = styled.main`
  max-width: 400px;
  margin-inline: auto;
  padding-top: 72px;
`

export const FlexContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  gap: ${({ gap }) => gap};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 30px;
  margin-bottom: 18px;
`