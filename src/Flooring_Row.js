import React, { Component } from 'react';
import Flooring_Comp from "./Flooring_Comp";

import './css/Main.scss';

const Row = function(props){
  const {checked, value, onChange, onChecked, name, count, tenY, sixty1, sixty2, radio, divStyle} = props;
  return (
    <div style={divStyle}>
      <Flooring_Comp name={name} count={count} tenY={tenY} sixty1={sixty1} sixty2={sixty2} radio={radio} />
    </div>
  );
}

export default Row