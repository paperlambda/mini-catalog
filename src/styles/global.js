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
    
    
    input, select{
      font-family: 'Noto Sans', sans-serif;
      height: ${theme.controlHeight}px;
      margin-right: 8px;
      padding: 0px 15px;
      font-size: 0.9rem;
      line-height: 1.2;
      
      border: 1px solid ${theme.color.grey}
      border-radius: 8px;
      background: transparent;
      color: ${theme.color.black};
      
      cursor: pointer;
      box-sizing: border-box;
      outline: none;
      -webkit-appearance: none;
      
    }
`

export default GlobalStyle
