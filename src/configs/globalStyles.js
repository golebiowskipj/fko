import { createGlobalStyle } from "styled-components";

import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        font-family: ${theme.fontFamily}, Open-Sans, Helvetica, Sans-Serif;
        font-size: ${theme.fontM};
        color: ${theme.secondary};
        overflow-x: hidden;
    }

    #root {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
    }
`;
