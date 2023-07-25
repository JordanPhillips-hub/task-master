import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope&family=Poppins:wght@500&display=swap");

:root {
    /* Neutral Colors */
  --neutral-100: hsl(0, 0%, 100%); // Pure white 
  --neutral-200: hsl(0, 0%, 96%); // Off-white 
  --neutral-300: hsl(0, 0%, 88%); // Lighter gray
  --neutral-400: hsl(0, 0%, 89%); // Light gray 
  --neutral-500: hsl(0, 0%, 44%); // Dim gray 
  --neutral-900: hsl(0, 0%, 0%);  // Black 

  /* Primary Colors */
  --primary-100: hsl(205, 100%, 53%); // Sky blue 
  --primary-200: hsl(29, 99%, 51%); // Bright orange 
  --primary-300: hsl(4, 100%, 60%); // Red orange 
  --primary-400: hsl(205, 100%, 40%); // Deep sky blue 

  /* Secondary Colors */
  --secondary-100: hsl(120, 100%, 97%); // Pale green 
  --secondary-200: hsl(120, 100%, 95%); // Light green 

  /* Transparent Colors */
  --trans-100: hsla(205, 100%, 53%, 0.1); // Light blue transparent 
  --trans-200: hsla(4, 100%, 60%, 0.1);   // Red transparent 

  /* Tag Colors */
   --tag-100: hsl(37, 100%, 93%);  // Light beige 
   --tag-200: hsl(110, 100%, 93%); // Mint green 
   --tag-300: hsl(183, 100%, 93%); // Light cyan 
   --tag-400: hsl(10, 100%, 93%); // Red
   --tag-500: hsl(270, 100%, 93%); // Purple
   --tag-600: hsl(50, 100%, 93%); // Orangish
   --tag-700: hsl(80, 100%, 93%); // Yellowish
   --tag-800: hsl(150, 100%, 93%); // Teal
   --tag-900: hsl(190, 100%, 93%); // Cyan
   --tag-1000: hsl(255, 100%, 93%); // Light Blue
   --tag-1100: hsl(220, 100%, 93%); // Blue
   --tag-1200: hsl(300, 100%, 93%); // Magenta
   --tag-1300: hsl(330, 100%, 93%); // Pink
   --tag-1400: hsl(25, 100%, 93%); // Orange
   --tag-1500: hsl(63, 100%, 93%); // Golden Yellow
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
  background-color: var(--neutral-200);
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
  color: var(--neutral-900);
  font-weight: 500;
}

h2 {
  font-size: 1.125rem;
  margin-bottom: 7px;
}

ul, 
ol { 
  list-style: none;
padding: 6px;
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
  color: var(--primary-100);
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