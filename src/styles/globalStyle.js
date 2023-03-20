import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: overlay;
  overflow: hidden;
  background-color: ${props => props.theme.color.blue.brandColor1};
}

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-clip: padding-box;
      border: 0 solid transparent;
      border-radius: 10px;
      background-color: ${props => props.theme.color.blue.brandColor6};
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

html,
body,
div,
ul{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font:inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul,li {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
h1,h2,h3,h4,h5,h6{
  vertical-align: baseline;
  margin: 0;
  padding: 0;
}

path{
  pointer-events: none;
}

* {
  box-sizing: border-box;
  text-decoration-line: none;
  color: inherit;
}

*:focus {
    outline: none !important;
  }

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root{
  width: 100vw;
  height: 100vh;
}

`;

export default GlobalStyle;
