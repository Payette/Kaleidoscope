/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";
import styles from './css/MaterialList.module.scss';
import Dialog from 'react-a11y-dialog';
import materialPopupMock from './images/popupmock.png';
import MVGranite from './images/Detail_MockUp_MVGranite.png'
import RSGranite from './images/Detail_MockUp_RSGranite.png'
import legendGWP from './images/k-04.png'
import legendImpacts from './images/k-02.png'
import legendLCS from './images/k-03.png'
import legendMB from './images/MaterialBreakdown-11.png'
import { render } from 'react-dom'
import Checkbox from './Checkbox'
import Pie from "./PieChart";

import 'pretty-checkbox'
let myImg;
let legend;
let legendText = "hello";


export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material }}),
      selectedItems: props.initialSelectedMaterials,
      materialPopup: {
        name: "Material"
      },
      checked: true,
      curSel: 'tenYGWP'
    };

    this.listEl = null;
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(e) {
    const { value } = e.target;
    const nextValue = this.getNextValue(value);

    this.setState({ selectedItems: nextValue });
    this.props.updateSelectedMaterials(nextValue);
  }

  handleSelectAll(e) {
    this.setState({ selectedItems: this.props.materials });
    this.props.updateSelectedMaterials(this.props.materials);
  }

  getNextValue(value) {
    const { selectedItems } = this.state;

    // if it's already in there, remove it, otherwise append it
    return selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value];
  }

  

  showMaterialsPopup(event, material) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(material);
    myImg = 'https://raw.githubusercontent.com/Payette/LCA-Dashboard/master/public/images/' + material.id.toLowerCase() + '.png';

    this.setState({
      materialPopup: {
        name: material.label
      }
    }, () => {
      this.materialsDialogRef.show();
    })    
  } 

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }

  

  renderItems() {
    

    const { items, selectedItems } = this.state;
    return items.map(item => {
      const { id, label } = item;

      let materialColor = '#4d4d4f';

      if(this.props.currentSel==="GWP"){
        materialColor = this.props.metaData.materialColors[id] ? this.props.metaData.materialColors[id] : '#4d4d4f';
      }

      


      
      const materialIcon = this.props.metaData.materialIcons[id] ? this.props.metaData.materialIcons[id] : undefined;
      const materialType = this.props.metaData.materialType[id] ? this.props.metaData.materialType[id] : undefined;

      return (
        
        <li key={id} className={styles.material}>
          
        
  <label>
          <Checkbox
          caseStudyColor={materialColor}
            onChange={this.handleSelectItem}
            type="checkbox"
            checked={selectedItems.includes(id)}
            value={id}
            id={`item-${id}`}
            name="check"           
          />
 
        </label>
     
          
          <button className={styles.moreInformationButton} onClick={event => this.showMaterialsPopup.bind(this)(event, item)}><label className={styles.mLabel} htmlFor={`item-${id}`}>{materialType}</label></button>
        </li>
      );
    });
  }

  selectChange(e){
    // this.state.curSel = e.target.value;
    this.setState({ curSel: e.target.value })

    }

  render() {
    // console.log(this.props.currentSel);

    if(this.props.currentSel === "GWP"){
      legend = legendGWP;
      legendText = ""
    }else if(this.props.currentSel === "allImpacts"){
      legend = legendGWP;
      legendText = <div style={{fontFamily: "freight-text-pro, serif"}}><p> <span style={{background: "#87cee9"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Global Warming Potential (kgCO<sub>2</sub>eq/sf)</p> <p> <span style={{background: "#6495ed"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Non-Renewable Energy Demand (MJ/sf)</p><p> <span style={{background: "#fcc05e"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Eutrophication Potential (kgNeq/sf)</p> <p> <span style={{background: "#0090ff"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Smog Formation Potential (kgO<sub>3</sub>eq/sf)</p><p> <span style={{background: "#85e2bd"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Acidification Potential (kgSO<sub>2</sub>eq/sf)</p> <p> <span style={{background: "#283cdc"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Ozone Depletion Potential (CFC-11eq/sf)</p></div>
    }else if(this.props.currentSel === "LCS"){
      legend = legendGWP;
      legendText = <div style={{fontFamily: "freight-text-pro, serif"}}><p> <span style={{background: "#85e2bd"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [A1 - A3] Product </p> <p> <span style={{background: "#fcc05e"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [A4] Transportation </p><p> <span style={{background: "#001489"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [B2 - B5] Maintenance and Replacement </p> <p> <span style={{background: "#4095ee"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [C2 - C4] End of Life </p><p> <span style={{background: "#a2d3eb"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [D] Module D </p> </div>
    }else if(this.props.currentSel === "MB"){
      legend = legendMB;
      legendText = <div style={{fontFamily: "freight-text-pro, serif"}}><img style={{maxWidth: "320px"}} src={legend}/><p> <span style={{background: "#85e2bd"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Exterior Finish </p> <p> <span style={{background: "#4169e1"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Support System </p> <p> <span style={{background: "#fcc05e"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Insulation </p> <p> <span style={{background: "#cccccc"}}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Other </p></div>
    }

    //CHANGE THE MODAL TO IMG OF MASONRY VENEER GRANITE AS DEFAULT
    let currentImg = MVGranite;
    //IF IT IS RAINSCREEN USE THAT IMG INSTEAD

    // if(this.state.materialPopup.name === "Granite1"){
    //   currentImg = RSGranite;
    // };

    currentImg = this.props.metaData.pieIcons[this.state.materialPopup.name];
    // console.log(this.props.metaData.materialIcons[this.state.materialPopup.name])
    let sectionImg = this.props.metaData.sectionIcons[this.state.materialPopup.name];

    // console.log(this.props);

    let concatNotes = [];
    concatNotes = this.props.metaData.materialNotes[this.state.materialPopup.name];

    let myNotes;
    // console.log(this.state.materialPopup)
    let listItems;
    if(this.state.materialPopup.name !== "Material"){
      listItems = this.props.metaData.materialNotes[this.state.materialPopup.name].map((number) =>
    <li>- {number}</li>
  );
  
    }


  
    return (
      
      <div>
        <div>
        <h3>LEGEND</h3>
          <span>
            {legendText}
          {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src={legend}/> */}<br></br>
          </span>
          <span>
          <h3 style={{display: "inline-block"}}>ASSEMBLY TYPE</h3><button className={styles.mButton} onClick={e => this.handleSelectAll.bind(this)(e)}>Select All</button><br></br><br>
          </br><span style={{fontFamily:"freight-text-pro, serif", marginBottom:10}}>Click on a type below for additional details</span><br></br>
          
          </span><br></br>
        </div>
        <div>
        
        <ul className={styles.container} ref={node => (this.listEl = node)}>{this.renderItems()}
        
        </ul>
        </div>

        <Dialog id="materialdetailsdialog"
          appRoot="#root"
          dialogRoot="#dialog-root"
          dialogRef={(dialog) => (this.materialsDialogRef = dialog)}
          // title={this.state.materialPopup.name}
          classNames={{
            overlay: "dialog-overlay",
            closeButton: "dialog-close",
            element: "dialog-content",
            base: "dialog"
          }}
          
          >
            <span>
              <h2 style={{fontSize: "40px"}}>{this.props.metaData.materialName2[this.state.materialPopup.name]}</h2>
              {/* <p style={{fontSize:"18px"}}><strong>10 year lifespan with biogenic carbon:</strong><br></br></p> */}
              <select id="pie1" name="pie1" id='piech' onChange={this.selectChange.bind(this)}>
          <option value="tenYGWP">Initial carbon (only Module A)</option>
            <option value="sixty2YGWP">60 year lifespan with Module D and biogenic carbon</option>
            <option value="sixty1YGWP">60 year lifespan with biogenic carbon</option>
            
          </select>
              <p id="textLabel" style={{display:"block", width:"100%", position:"relative", textAlign:"left", }}>Hover over chart to see data</p> 
              <br></br>
              <div style={{width: "30%",float:"left", position:"relative", textAlign:"center"}}>
              {/* <p style={{position:"absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex:"100", marginLeft:"2.5em"}}><strong>{this.props.gwp[this.state.materialPopup.name]}</strong><br></br>kgCO&#x2082;eq/sf<br></br>GWP</p><br></br> */}
              {/* <img style={{width:"100%",  transform:"scaleX(-1)", zIndex:"-1", marginLeft:"3em"}} src={currentImg} alt={`${this.state.materialPopup.name} facade diagram`} /> */}
              <Pie style={{width:"100%",  transform:"scaleX(-1)", zIndex:"-1", marginLeft:"3em"}}  
              width={window.innerWidth/3} 
              height={380} 
              matBreakdown={this.props.matBreakdown} 
              matBreakdown1={this.props.matBreakdown1} 
              matBreakdown2={this.props.matBreakdown2} 
              currentMat={this.state.materialPopup.name} 
              tenYGWP={this.props.tenYGWP}
              sixty1YGWP={this.props.sixty1YGWP}
              sixty2YGWP={this.props.sixty2YGWP}
              GWPSel = {this.state.curSel}
              />
                 

              </div>
              {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src={materialPopupMock} alt={`${this.state.materialPopup.name} facade diagram`} /> */}
              {/* <img style={{maxWidth: "30%", maxHeight: "30%", paddingBottom: "3em"}} src={currentImg} alt={`${this.state.materialPopup.name} facade diagram`} /> */}
              
                            <img style={{maxWidth: "45%", top:"-70px", position:"relative", float:"right", objectFit:"cover", display:"block"}} src={sectionImg} alt={`${this.state.materialPopup.name} facade diagram`} />
                                    
              <div style={{maxWidth:"55%", float:"left", position:'relative'}}><h4>Assumptions</h4>
              
              <ul style={{lineHeight:'1.6em', fontSize: '16px', paddingLeft:'1em'}}>{listItems}</ul></div>
              {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src={myImg} alt="material icon"/> */}
            </span>
        </Dialog>
      </div>
    )
  }
}

