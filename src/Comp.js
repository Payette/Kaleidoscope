import React from "react";
import styles from './css/Comp.module.scss';

// let rad = 1;

export default class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], count:1, vals: [], vals1: [], sum:0, sum1:0, radio:1, allMaterials:[0], show:false};
    // this.handleInputChange = this.handleInputChange.bind(this);
    
  }
  // static getDerivedStateFromProps(props, current_state) {
  //   if (current_state.radio !== props.radio) {
  //     console.log("changed");
  //     rad = props.radio;

  //     return {
  //       radio: props.radio,
  //       // computed_prop: radC(props.radio)
  //     }
  //   }
  //   return null
  // }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.radio !== this.props.radio) {
      this.radC(this.props.radio)
    }
  }

  radC(e){

    let myMult = 0;
    let currentRadio = e;
    
    if(currentRadio == 1){
      this.state.allMaterials = this.props.tenY
    }else if(currentRadio == 2){
      this.state.allMaterials = this.props.sixty1
    }else{
      this.state.allMaterials = this.props.sixty2
    }

    for(let i = 0; i < this.state.count; i++){
      let currentPos = document.getElementById("select-position"+this.props.name+(i+1).toString());
      let currentSelect = document.getElementById("select-type"+this.props.name+(i+1).toString());
      let theCurrentMat = (currentSelect.options[ currentSelect.selectedIndex ].value);
      for(let j = 0; j < this.state.allMaterials.length; j++){

        if(this.state.allMaterials[j].material == theCurrentMat){
          myMult = this.state.allMaterials[j].value
          let num = parseInt(currentPos.value) || 0;
          this.state.vals[i]= num * myMult;
          this.state.vals1[i]= num;
        }
      }
    }
    let mRes = 0;
    let mRes1 = 0;
    for(let i = 0; i < this.state.vals.length; i++){
      let placeholderVal = 0
      let placeholderVal1 = 0
      if(this.state.vals[i] == undefined || isNaN(this.state.vals[i])){
        placeholderVal = 0;
      }else{
        placeholderVal = this.state.vals[i]
      }

      if(this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])){
        placeholderVal1 = 0;
      }else{
        placeholderVal1 = this.state.vals1[i]
      }
      mRes += placeholderVal;
      mRes += placeholderVal1;
      console.log(this.state.vals)
    }
    console.log(mRes)
    mRes = mRes.toFixed(2);
    this.setState({ sum: this.formatNumber(mRes)});
    this.setState({ sum1: this.formatNumber(mRes1)});
  }

  selectChange(e){
    let currentRadio = this.props.radio;
    // var ele = document.getElementsByName('gender'+this.props.name); 
    //   for(let i = 0; i < ele.length; i++) { 
    //       if(ele[i].checked) {
    //         currentRadio = ele[i].value
    //       }
    //   } 
    
    if(currentRadio == 1){
      this.state.allMaterials = this.props.tenY
    }else if(currentRadio == 2){
      this.state.allMaterials = this.props.sixty1 
    }else{
      this.state.allMaterials = this.props.sixty2
    }
    // this.state.allMaterials = this.props.tenY
    let myStr = e.target.id;
    let myStr2 = myStr[myStr.length - 2]
    myStr = myStr[myStr.length - 1]
    let myMult = 0;
    let currentPos = document.getElementById("select-position"+myStr2+myStr);
    let currentSelect = document.getElementById("select-type"+myStr2+myStr);
    // console.log(mySel)
    let theCurrentMat = (currentSelect.options[ currentSelect.selectedIndex ].value);
    for(let i = 0; i < this.state.allMaterials.length; i++){
      // console.log(e)
      if(this.state.allMaterials[i].material == theCurrentMat){
        myMult = this.state.allMaterials[i].value
        let num = parseInt(currentPos.value)
        let gwpDisplay = document.getElementById("displayGWP"+myStr2+myStr)
        gwpDisplay.innerHTML = (Number(num) * myMult).toFixed(2);
        this.state.vals[myStr-1]= num * myMult;
        this.state.vals1[myStr-1]= num;
      }
    }
    
    console.log(this.props.radio);
    let mRes = 0;
    let mRes1 = 0;
    for(let i = 0; i < this.state.vals.length; i++){
      let placeholderVal = 0
      if(this.state.vals[i] == undefined || isNaN(this.state.vals[i])){
        placeholderVal = 0;
      }else{
        placeholderVal = this.state.vals[i]
      }
      mRes += placeholderVal;
    }
    for(let i = 0; i < this.state.vals.length; i++){
      let placeholderVal1 = 0
      if(this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])){
        placeholderVal1 = 0;
      }else{
        placeholderVal1 = this.state.vals1[i]
      }
      mRes1 += placeholderVal1;
    }
    mRes = mRes.toFixed(2);
    this.setState({ sum: this.formatNumber(mRes)});
    this.setState({ sum1: this.formatNumber(mRes1)});

    
    // console.log(this.state.allMaterials)
  }

  

  handleChange(e) {

    console.log(this.state.vals);
    console.log(this.state.vals1);
    console.log(e.target)


    let currentRadio = this.props.radio;
    // var ele = document.getElementsByName('gender'+this.props.name); 
    //   for(let i = 0; i < ele.length; i++) { 
    //       if(ele[i].checked) {
    //         currentRadio = ele[i].value
    //       }
    //   } 
    
    if(currentRadio == 1){
      this.state.allMaterials = this.props.tenY
    }else if(currentRadio == 2){
      this.state.allMaterials = this.props.sixty1
    }else{
      this.state.allMaterials = this.props.sixty2
    }

    // this.state.allMaterials = this.props.tenY
    let myStr = e.target.id;
    let myStr2 = myStr[myStr.length - 2]
    myStr = myStr[myStr.length - 1]
    let myMult = 0;
    let currentSelect = document.getElementById("select-type"+myStr2+myStr);
    
    // console.log(mySel)
    let theCurrentMat = (currentSelect.options[ currentSelect.selectedIndex ].value);
    for(let i = 0; i < this.state.allMaterials.length; i++){
      // console.log(e)
      if(this.state.allMaterials[i].material == theCurrentMat){
        myMult = this.state.allMaterials[i].value
        let num = parseInt(e.target.value)
        let gwpDisplay = document.getElementById("displayGWP"+myStr2+myStr)
        gwpDisplay.innerHTML = (Number(num) * myMult).toFixed(2);
        
        this.state.vals[myStr-1]= Number(num) * myMult;
        this.state.vals1[myStr-1]= Number(num);
      }
    }

    let emptyArray = []
    
    console.log(this.state.vals);
    let mRes = 0;
    let mRes1 = 0;
    for(let i = 0; i < this.state.vals.length; i++){
      let placeholderVal = 0
      if(this.state.vals[i] == undefined || isNaN(this.state.vals[i])){
        placeholderVal = 0;
      }else{
        placeholderVal = this.state.vals[i]
      }
      mRes += placeholderVal;
      emptyArray.push(placeholderVal);
    }
    for(let i = 0; i < this.state.vals1.length; i++){
      let placeholderVal1 = 0
      if(this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])){
        placeholderVal1 = 0;
      }else{
        placeholderVal1 = this.state.vals1[i]
      }
      mRes1 += placeholderVal1;
    }
    mRes = mRes.toFixed(2);
    this.setState({ vals: emptyArray})
    this.setState({ sum: this.formatNumber(mRes)});
    this.setState({ sum1: this.formatNumber(mRes1)});
    // console.log(this.props.allMaterials)
    
  }


  
  

  appendRow(event) {
    var rel = event.target.getAttribute("rel");
    rel = parseInt(rel) + 1;
    this.state.count++;
    console.log(this.state.count)
    console.log(this.props.name)
    
    

    var joined = this.state.rows.concat(
      <tr>
        <td>
          <select id="mat" name="mat" onChange={this.selectChange.bind(this)} id={`select-type` + this.props.name + this.state.count}>
          <option value="MVGranite">MV - Granite</option>
            <option value="MVLimestone">MV - Limestone</option>
            <option value="MVBrick">MV - Brick</option>
            <option value="MVTBrick">MV - Thin Brick</option>
            <option value="MInsMePanel">M - Insulated Metal Panel</option>
            <option value="MEIFS">M - EIFS (XPS)</option>
            <option value="MPrecast">M - Precast Concrete</option>
            <option value="MMinWool">M - EIFS (Min Wool)</option>
            <option value="CSpandrelAlumB">CW - Spandrel (Alum w/ Backpan)</option>
            <option value="CSpandrelSteel">CW - Spandrel (Steel)</option>
            <option value="CSpandrelAlum">CW - Spandrel (Alum)</option>
            <option value="CSpandrelWood">CW - Spandrel (Wood)</option>
            <option value="RGFRC">RS - GFRC</option>
            <option value="RACM">RS - ACM</option>
            <option value="RTerracotta">RS - Terracotta</option>
            <option value="RPhenResin">RS - Phenolic Resin</option>
            <option value="RFiberCement">RS - Fiber Cement</option>
            <option value="RZinc">RS - Formed Zinc Panel</option>
            <option value="RUHPC">RS - UHPC (fibreC)</option>
            <option value="RGranite">RS - Granite</option>
            <option value="RTBrick">RS - Thin Brick</option>
            <option value="RLimestone">RS - Limestone</option>
            <option value="RSteel">RS - Formed Steel Panel</option>
            <option value="RWood">RS - Wood</option>
          </select>
        </td>
        <td>
          <input type="number" onChange={this.handleChange.bind(this)} id={`select-position` + this.props.name + this.state.count} />
        </td>
        <td id={`displayGWP` + this.props.name + this.state.count}>
          {/* {this.state.vals[0]} */}
          0.00
        </td>
      </tr>
    );
    this.setState({ rows: joined });
    console.log(this.state.rows);

    for(let i = 1; i < this.state.count; i++){
      let currentSelect = document.getElementById("select-type" + this.props.name + i);
      console.log(currentSelect);
      console.log(currentSelect.options[ currentSelect.selectedIndex ].value);
    }

    
  }

  removeRow(){
    let mArray = []
    for(let i = 0; i < this.state.rows.length-1; i++){
      mArray.push(this.state.rows[i]);
    }
    this.setState({ rows: mArray });
    this.state.count--;
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
  
    return (
      <div className={styles.calculator}>
        {/* <div style={{margin:"auto", textAlign:"center"}}>
          <input type="radio" id="ten" name={"gender"+ this.props.name} value="1" onChange={this.radioChange.bind(this)} defaultChecked></input>
      <label for="ten"> 10 Year &nbsp;&nbsp;</label>
      <input type="radio" id="sixty1" name={"gender"+ this.props.name} value="2" onChange={this.radioChange.bind(this)}></input>
      <label for="sixty1"> 60 Year (no Module D) &nbsp;&nbsp;</label>
      <input type="radio" id="sixty2" name={"gender"+ this.props.name} value="3" onChange={this.radioChange.bind(this)}></input>
      <label for="sixty2"> 60 Year (with Module D) &nbsp;&nbsp;</label>
    </div> */}
        
        
        <table style={{borderCollapse: "collapse", width:"100%", textAlign:"center"}}>
        
          <thead>
            <td colspan="3" style={{textAlign:"left", height:"25px"}}>&nbsp;&nbsp;<strong>Option {this.props.name}</strong></td>
          </thead>
          <tbody>
          <tr>
            <td>Type</td>
            <td>Square Feet</td>
            <td>GWP</td>
          </tr>
          <tr>
        <td>
          {/* <input type="text" id={`select-type` + rel} /> */}
          <select id="mat" name="mat" onChange={this.selectChange.bind(this)} id={`select-type` + this.props.name +`1`}>
          <option value="MVGranite">MV - Granite</option>
            <option value="MVLimestone">MV - Limestone</option>
            <option value="MVBrick">MV - Brick</option>
            <option value="MVTBrick">MV - Thin Brick</option>
            <option value="MInsMePanel">M - Insulated Metal Panel</option>
            <option value="MEIFS">M - EIFS (XPS)</option>
            <option value="MPrecast">M - Precast Concrete</option>
            <option value="MMinWool">M - EIFS (Min Wool)</option>
            <option value="CSpandrelAlumB">CW - Spandrel (Alum w/ Backpan)</option>
            <option value="CSpandrelSteel">CW - Spandrel (Steel)</option>
            <option value="CSpandrelAlum">CW - Spandrel (Alum)</option>
            <option value="CSpandrelWood">CW - Spandrel (Wood)</option>
            <option value="RGFRC">RS - GFRC</option>
            <option value="RACM">RS - ACM</option>
            <option value="RTerracotta">RS - Terracotta</option>
            <option value="RPhenResin">RS - Phenolic Resin</option>
            <option value="RFiberCement">RS - Fiber Cement</option>
            <option value="RZinc">RS - Formed Zinc Panel</option>
            <option value="RUHPC">RS - UHPC (fibreC)</option>
            <option value="RGranite">RS - Granite</option>
            <option value="RTBrick">RS - Thin Brick</option>
            <option value="RLimestone">RS - Limestone</option>
            <option value="RSteel">RS - Formed Steel Panel</option>
            <option value="RWood">RS - Wood</option>
          </select>
        </td>
        <td>
          <input type="number" onChange={this.handleChange.bind(this)} id={`select-position` + this.props.name +`1`} />
        </td>
        <td id={`displayGWP` + this.props.name + `1`}></td>
      </tr>
            {this.state.rows}</tbody>
            <tr style={{height:"35px"}}>
              <td >
                {/* Total: */}
              </td>
              <td >
                <strong style={{color:"#dc1a55", fontSize:"1.3em"}}>{this.state.sum1}</strong> ft<sup>2</sup>
              </td>
              <td>
              <strong style={{color:"#dc1a55", fontSize:"1.3em"}}>{this.state.sum}</strong> kgCO<sub>2</sub>eq
              </td>
            </tr>
        </table><br></br>
        <button rel="1" onClick={this.appendRow.bind(this)}>
          Add row
        </button>&nbsp;
        <button rel="1" onClick={this.removeRow.bind(this)}>
          Remove row
        </button>
      </div>
    );
  }
}
