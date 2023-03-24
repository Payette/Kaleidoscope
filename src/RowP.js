import React, { Component } from 'react';
import ComparisonP from "./ComparisonP";

import './css/Main.scss';

const RowP = function (props) {
  const { checked, value, onChange, onChecked, name, count, tenY, sixty1, sixty2, radio, divStyle } = props;
  return (
    <div style={divStyle}>
      <ComparisonP name={name} count={count} tenY={tenY} sixty1={sixty1} sixty2={sixty2} radio={radio} materialList={props.materialList} />
    </div>
  );
}

export default RowP