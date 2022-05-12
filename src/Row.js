import React, { Component } from 'react';
import Comp from "./CompCombined";

import './css/Main.scss';

const Row = function(props){
  const {checked, value, onChange, onChecked, name, count, tenY, sixty1, sixty2, radio, divStyle} = props;
  return (
    <div style={divStyle}>
      <Comp name={name} count={count} tenY={tenY} sixty1={sixty1} sixty2={sixty2} radio={radio} materialList={props.materialList} />
    </div>
  );
}

export default Row