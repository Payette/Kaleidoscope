import React, { Component } from 'react';
import Comparison from "./Comparison";

import './css/Main.scss';

const Row = function (props) {
  const { checked, value, onChange, onChecked, name, count, tenY, sixty1, sixty2, radio, divStyle } = props;
  return (
    <div style={divStyle}>
      <Comparison name={name} count={count} tenY={tenY} sixty1={sixty1} sixty2={sixty2} radio={radio} materialList={props.materialList} />
    </div>
  );
}

export default Row