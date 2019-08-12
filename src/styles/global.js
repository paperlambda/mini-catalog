import { createGlobalStyle } from 'styled-components'
import theme from '@/styles/theme'

const GlobalStyle = createGlobalStyle`
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans', sans-serif;
      background: ${theme.color.grey}
    }
    
    * {
      box-sizing: border-box;
    }
`

export default GlobalStyle
