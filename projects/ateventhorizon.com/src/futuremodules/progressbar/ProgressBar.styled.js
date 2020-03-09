import styled, {keyframes} from "styled-components";

const keyFrameExampleOne = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(46px);
    }`;

export const ProgressBarDiv = styled.div` {
    position: absolute;
    left: -46px;
    right: 0;
    min-width: ${props => props.perc}%;
    width: ${props => props.perc}%;
    height:6px;
    top: var(--navbar-height);
    
    background: repeating-linear-gradient(
      -55deg,
      var(--primary-color-light) 1px,
      var(--light-color) 2px,
      var(--primary-color-light) 11px,
      var(--light-color) 12px,
      var(--primary-color-light) 20px
    );
  
    animation-name: ${keyFrameExampleOne};
    animation-duration: .6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }`;
