import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  /* border: 0; */
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  color: white;
  content: "X";

`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  color: white;
  content: "X";

  background: ${(props) => (props.checked ? props.caseStudyColor : '#fff')};
  
  border-radius: 0px;
  transition: all 150ms;
  box-shadow: ${(props) => '0 0 0 3px ' + props.caseStudyColor};
  border: 2px solid #fff;


  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = ({ className, checked, caseStudyColor, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} caseStudyColor={caseStudyColor}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
