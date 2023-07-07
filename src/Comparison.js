import React from "react";
import styles from './css/Comp.module.scss';

// let rad = 1;

export default class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], count: 1, vals: [], vals1: [], sum: 0, sum1: 0, radio: 1, allMaterials: [0], show: false, selectedMaterials: [], csvData:[], results:[]};
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.exportToCsv = this.exportToCsv.bind(this);



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



  radC(e) {

    let myMult = 0;
    let currentRadio = e;

    if (currentRadio == 1) {
      this.setState({ allMaterials: this.props.tenY });
    } else if (currentRadio == 2) {
      this.setState({ allMaterials: this.props.sixty1 });
    } else {
      this.setState({ allMaterials: this.props.sixty2 });
    }

    for (let i = 0; i < this.state.count; i++) {
      let currentPos = document.getElementById("select-position" + this.props.name + (i + 1).toString());
      let currentSelect = document.getElementById("select-type" + this.props.name + (i + 1).toString());
      let theCurrentMat = (currentSelect.options[currentSelect.selectedIndex].value);
      for (let j = 0; j < this.state.allMaterials.length; j++) {

        if (this.state.allMaterials[j].material == theCurrentMat) {
          myMult = this.state.allMaterials[j].value
          let num = parseInt(currentPos.value) || 0;
          this.state.vals[i] = num * myMult;
          this.state.vals1[i] = num;
        }
      }
    }
    let mRes = 0;
    let mRes1 = 0;
    for (let i = 0; i < this.state.vals.length; i++) {
      let placeholderVal = 0
      let placeholderVal1 = 0
      if (this.state.vals[i] == undefined || isNaN(this.state.vals[i])) {
        placeholderVal = 0;
      } else {
        placeholderVal = this.state.vals[i]
      }

      if (this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])) {
        placeholderVal1 = 0;
      } else {
        placeholderVal1 = this.state.vals1[i]
      }
      mRes += placeholderVal;
      mRes1 += placeholderVal1;
      console.log(this.state.vals)
    }
    console.log(mRes)
    console.log(mRes1)
    mRes = mRes.toFixed(2);
    this.setState({ sum: this.formatNumber(mRes) });
    this.setState({ sum1: this.formatNumber(mRes1) });

    /////////////////////////////

    
  }

  selectChange(e) {
    let currentRadio = this.props.radio;
    // var ele = document.getElementsByName('gender'+this.props.name); 
    //   for(let i = 0; i < ele.length; i++) { 
    //       if(ele[i].checked) {
    //         currentRadio = ele[i].value
    //       }
    //   } 

    if (currentRadio == 1) {
      this.setState({ allMaterials: this.props.tenY });
    } else if (currentRadio == 2) {
      this.setState({ allMaterials: this.props.sixty1 });
    } else {
      this.setState({ allMaterials: this.props.sixty2 });
    }
    // this.state.allMaterials = this.props.tenY
    let myStr = e.target.id;
    let myStr2 = myStr[myStr.length - 2]
    myStr = myStr[myStr.length - 1]
    let myMult = 0;
    let currentPos = document.getElementById("select-position" + myStr2 + myStr);
    let currentSelect = document.getElementById("select-type" + myStr2 + myStr);
    // console.log(mySel)
    let theCurrentMat = (currentSelect.options[currentSelect.selectedIndex].value);
    for (let i = 0; i < this.state.allMaterials.length; i++) {
      // console.log(e)
      if (this.state.allMaterials[i].material == theCurrentMat) {
        myMult = this.state.allMaterials[i].value
        let num = parseInt(currentPos.value)
        let gwpDisplay = document.getElementById("displayGWP" + myStr2 + myStr)
        gwpDisplay.innerHTML = (Number(num) * myMult).toFixed(2);
        this.state.vals[myStr - 1] = num * myMult;
        this.state.vals1[myStr - 1] = num;
      }
    }

    console.log(this.props.radio);
    let mRes = 0;
    let mRes1 = 0;
    for (let i = 0; i < this.state.vals.length; i++) {
      let placeholderVal = 0
      if (this.state.vals[i] == undefined || isNaN(this.state.vals[i])) {
        placeholderVal = 0;
      } else {
        placeholderVal = this.state.vals[i]
      }
      mRes += placeholderVal;
    }
    for (let i = 0; i < this.state.vals.length; i++) {
      let placeholderVal1 = 0
      if (this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])) {
        placeholderVal1 = 0;
      } else {
        placeholderVal1 = this.state.vals1[i]
      }
      mRes1 += placeholderVal1;
    }
    mRes = mRes.toFixed(2);
    this.setState({ sum: this.formatNumber(mRes) });
    this.setState({ sum1: this.formatNumber(mRes1) });


    // console.log(this.state.allMaterials)
  
    // Update the selected material
    let theCurrentMatText = currentSelect.options[currentSelect.selectedIndex].text;
    this.setState(prevState => {
      let selectedMaterials = [...prevState.selectedMaterials];
      selectedMaterials[myStr - 1] = theCurrentMatText;
      return { selectedMaterials };
    });

    ///////////////////////////

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

    if (currentRadio == 1) {
      this.setState({ allMaterials: this.props.tenY });
    } else if (currentRadio == 2) {
      this.setState({ allMaterials: this.props.sixty1 });
    } else {
      this.setState({ allMaterials: this.props.sixty2 });
    }

    // this.state.allMaterials = this.props.tenY
    let myStr = e.target.id;
    let myStr2 = myStr[myStr.length - 2]
    myStr = myStr[myStr.length - 1]
    let myMult = 0;
    let currentSelect = document.getElementById("select-type" + myStr2 + myStr);

    // console.log(mySel)
    let theCurrentMat = (currentSelect.options[currentSelect.selectedIndex].value);
    for (let i = 0; i < this.state.allMaterials.length; i++) {
      // console.log(e)
      if (this.state.allMaterials[i].material == theCurrentMat) {
        myMult = this.state.allMaterials[i].value
        let num = parseInt(e.target.value)
        let gwpDisplay = document.getElementById("displayGWP" + myStr2 + myStr)
        gwpDisplay.innerHTML = (Number(num) * myMult).toFixed(2);

        this.state.vals[myStr - 1] = Number(num) * myMult;
        this.state.vals1[myStr - 1] = Number(num);
      }
    }

    let emptyArray = []

    console.log(this.state.vals);
    let mRes = 0;
    let mRes1 = 0;
    for (let i = 0; i < this.state.vals.length; i++) {
      let placeholderVal = 0
      if (this.state.vals[i] == undefined || isNaN(this.state.vals[i])) {
        placeholderVal = 0;
      } else {
        placeholderVal = this.state.vals[i]
      }
      mRes += placeholderVal;
      emptyArray.push(placeholderVal);
    }
    for (let i = 0; i < this.state.vals1.length; i++) {
      let placeholderVal1 = 0
      if (this.state.vals1[i] == undefined || isNaN(this.state.vals1[i])) {
        placeholderVal1 = 0;
      } else {
        placeholderVal1 = this.state.vals1[i]
      }
      mRes1 += placeholderVal1;
    }
    mRes = mRes.toFixed(2);
    this.setState({ vals: emptyArray })
    this.setState({ sum: this.formatNumber(mRes) });
    this.setState({ sum1: this.formatNumber(mRes1) });
    // console.log(this.props.allMaterials)
  
    // Update the selected material
    let theCurrentMatText = currentSelect.options[currentSelect.selectedIndex].text;
    this.setState(prevState => {
      let selectedMaterials = [...prevState.selectedMaterials];
      selectedMaterials[myStr - 1] = theCurrentMatText;
      return { selectedMaterials };
    });

    /////////////////////////////

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
            {this.props.materialList.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
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

    for (let i = 1; i < this.state.count; i++) {
      let currentSelect = document.getElementById("select-type" + this.props.name + i);
      console.log(currentSelect);
      console.log(currentSelect.options[currentSelect.selectedIndex].value);
    }
    
    ////////////////////////


  }

  removeRow() {
    let mArray = []
    for (let i = 0; i < this.state.rows.length - 1; i++) {
      mArray.push(this.state.rows[i]);
    }
    this.setState({ rows: mArray });
    this.state.count--;
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }



  toCsv(data) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
  }

  generateCsvData() {
    const data = this.state.vals.map((val, i) => {
      const row = {
        MaterialType: this.state.selectedMaterials[i] || 'Not selected',
        Area: this.state.vals1[i],
        GWP: val
      };
      return row;
    });
  
    // Add the totals row
    data.push({
      MaterialType: 'Sum',
      Area: `${this.state.sum1} ft2`,
      GWP: `${this.state.sum} kgCO2eq`
    });
  
    // Convert data array to CSV string
    const csv = this.toCsv(data);
    console.log('csv',csv)
    // Return the CSV string
    return csv;
  }
  
  exportToCsv() {
    // Generate the CSV data
    const csv = this.generateCsvData();
  
    // Update the results array
    this.setState(prevState => ({
      results: [...prevState.results, csv]
    }), () => {
      console.log(this.state.results); // Print the results array
    });
  
    // Create a blob and download the file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Calculator.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
      {/* <button onClick={this.exportAllToCsv.bind(this)}>Export All</button> */}

      <button id="export-btn" onClick={this.exportToCsv}>
        Export CSV
      </button>

      <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>

        <thead>
          <td colspan="3" style={{ textAlign: "left", height: "25px" }}>&nbsp;&nbsp;<strong>Option {this.props.name}</strong></td>
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
              <select id="mat" name="mat" onChange={this.selectChange.bind(this)} id={`select-type` + this.props.name + `1`}>
                {this.props.materialList.map(m => <option value={m.value} key={m.value}>{m.label}</option>)}
              </select>
            </td>
            <td>
              <input type="number" onChange={this.handleChange.bind(this)} id={`select-position` + this.props.name + `1`} />
            </td>
            <td id={`displayGWP` + this.props.name + `1`}></td>
          </tr>
          {this.state.rows}</tbody>
        <tr style={{ height: "35px" }}>
          <td >
            {/* Total: */}
          </td>
          <td >
            <strong style={{ color: "#dc1a55", fontSize: "1.3em" }}>{this.state.sum1}</strong> ft<sup>2</sup>
          </td>
          <td>
            <strong style={{ color: "#dc1a55", fontSize: "1.3em" }}>{this.state.sum}</strong> kgCO<sub>2</sub>eq
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
