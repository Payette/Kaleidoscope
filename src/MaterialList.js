/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";
import styles from './css/MaterialList.module.scss';
import Dialog from 'react-a11y-dialog';
import MVGranite from './images/Detail_MockUp_MVGranite.png'
import legendGWP from './images/k-04.png'
import legendMBEnvelope from './images/MaterialBreakdown-11.png'
import legendMBFlooring from './images/System_Boundary-flooring_EDIT.png'
import legendMBCelings from './images/ceilingslegendaxon.png'
import { SYSTEM_TYPE_FLOORING, SYSTEM_TYPE_CEILINGS, SYSTEM_TYPE_ENVELOPES } from './CommonUtil';
import Checkbox from './Checkbox'
import Pie from "./PieChart";
import 'pretty-checkbox'
let myImg;
let legend;
let legendText = "hello";

let colsEnvelope = ["#c8e3b6", "#74deb6", "#bfe6b1", "#74deb6", "#bfe6b1", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#b6e6e9", "#bfe6b1", "#74deb6", "#93cee6", "#2461fa", "#2461fa", "#2461fa", "#74deb6", "#74deb6", "#bfe6b1", "#74deb6", "#bfe6b1", "#74deb6", "#93cee6", "#93cee6", "#b6e6e9", "#74deb6", "#74deb6", "#bfe6b1", "#bfe6b1", "#bfe6b1", "#93cee6", "#0087fb", "#2461fa", "#2461fa", "#00177b", "#ffe2b9", "#ffb65b", "#ffb65b", "#ffb65b", "#c5c5c5", "#aaaaaa", "#c5c5c5", "#aaaaaa", "#8e8e8e", "#5b5b5b", "#2d2d2d"]
const materialNamesEnvelope = ["mat49", "mat48", "mat47", "mat46", "mat45", "mat44", "mat43", "mat42", "mat41", "mat40", "mat39", "mat38", "mat37", "mat36", "mat35", "mat34", "mat33", "mat32", "mat31", "mat30", "mat29", "mat28", "mat27", "mat26", "mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"];
let materialLabelEnvelope = { mat1: "Paint, interior acrylic latex", mat2: "Wall board, gypsum, natural", mat3: "Cold formed structural steel", mat4: "Fiberglass mat gypsum sheathing board", mat5: "Self-adhering, polymer-modified asphalt sheet underlayment", mat6: "Aluminum Backpan", mat7: "Powder coating, metal stock", mat8: "Mineral wool, low density, NAIMA - EPD", mat9: "Spray polyurethane foal, closed cell, (HFO blowing agent)", mat10: "XPS insulation, Foamular average, Owens Corning - EPD", mat11: "Polyureathane foam (PUR) rigid board", mat12: "Adhesive, polychloroprene (neoprene)", mat13: "Galvanized steel", mat14: "Galvanized steel support", mat15: "Aluminum extrusion, AEC - EPD", mat16: "Fasteners, stainless steel", mat17: "Mortar type S", mat18: "Mortar type N", mat19: "Aluminum sheet", mat20: "Stone slab, granite", mat21: "Stone slab, limestone", mat22: "Cement bonded particle board", mat23: "Steel Sheet", mat24: "Zinc coating (galvanized) for stee G60", mat25: "Brick, generic", mat26: "Fluoropolymer coating, metal stock", mat27: "Steel insulated metal panel (IMP), MCA - EPD", mat28: "Glass fiber board, NAIMA - EPD", mat29: "Stucco synthetic", mat30: "Structural concrete, 5000 psi, 0% fly ash and slag", mat31: "Aluminum curtain wall system, YKK AP - EPD ", mat32: "Stainless steel, extruded chromium 18/8", mat33: "Glue laminated timber (Glulam), AWC - EPD", mat34: "Argon gas for IGU", mat35: "Glazing, monolithic sheet, tempered", mat36: "IGU spacer", mat37: "Low-e coating (for glazing)", mat38: "GFRC panel, Rieder, FibreC panel - EPD", mat39: "GFRC", mat40: "Aluminum-faced composite wall panel (ACM), MCA - EPD", mat41: "Terracotta", mat42: "Phenolic resin solid surfacing, sheet", mat43: "Fiber cement board", mat44: "Titanium zinc sheet, Rheinzink, prePATINA blue/graphite-grey - EPD", mat45: "Paint, enamel, solvent based", mat46: "Steel, sheet", mat47: "Wood stain, water based", mat48: "Tulipwood lumber, 1 inch", mat49: "Steel, welded wire mesh" };

let colsFlooring = ["#c7e9b7", "#c7e9b7", "#b5e2bd", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#89EFC0", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#0090ff", "#0090ff", "#0090ff", "#B3B3B3", "#B3B3B3", "#cccccc", "#cccccc", "#999999", "#666666"]
const materialNamesFlooring = ["mat27", "mat26", "mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"];
let materialLabelFlooring = { mat1: "Polyethelene sheet vapor barrier", mat2: "Interior grade plywood", mat3: "Cement grout", mat4: "Cement mortar", mat5: "Self-leveling underlayment", mat6: "Thickset mortar", mat7: "Fasteners, galvanized steel", mat8: "Floor adhesive, carpet", mat9: "Floor adhesive, latex", mat10: "Bamboo plank", mat11: "Ceramic tile, glazed", mat12: "Commercial high-traffic carpet, high pile", mat13: "Commercial high-traffic carpet, low pile", mat14: "Commercial high-traffic carpet, medium pile", mat15: "Cork tile", mat16: "Domestic softwood", mat17: "Granite tile", mat18: "Hardwood veneer, thick", mat19: "Homogeneous vinyl tile", mat20: "Linoleum tile", mat21: "SBS rubber tile", mat22: "Slate tile", mat23: "White oak lumber, 1 inch", mat24: "Terrazzo", mat25: "Epoxy", mat26: "Wood sealer, water-based", mat27: "Polyurethane floor finish" };

let colsCeilings = [ "#CCCCCC", "#666666", "#999999", "#666666", "#C2EAA7", "#C2EAA7", "#89EFC0", "#89EFC0", "#C2EAA7", "#FEE6BF", "#FCC05E", "#C2EAA7", "#89EFC0", "#89EFC0", "#89EFC0", "#89EFC0", "#C2EAA7", "#89EFC0", "#89EFC0", "#89EFC0", "#5CBDFF", "#00AAFF", "#4169E1", "#5CBDFF", "#000099" ];
let materialNamesCeilings = ["mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"]; 
let materialLabelCeilings = { mat1: "Steel, cable", mat2: "Suspended grid", mat3: "Cold formed structural steel", mat4: "Fasteners, galvanized steel", mat5: "Galvanized steel", mat6: "Acoustic ceiling tile (ACT), fiberglass", mat7: "Acoustic ceiling tile (ACT), mineral fiber board", mat8: "Acoustic ceiling tile (ACT), perforated aluminum", mat9: "Aluminum extrusion, AEC - EPD", mat10: "Aluminum, formed", mat11: "Ceiling tile, aluminum", mat12: "K-13 Spray on System", mat13: "Tulipwood lumber, 1 inch", mat14: "Medium density fiberboard (MDF), AWC - EPD", mat15: "Adhesive, polyurethane", mat16: "Hardwood veneer, medium thickness", mat17: "Hard maple lumber, 1 inch", mat18: "Wall board, gypsum, moisture- and mold-resistant", mat19: "Wall board, gypsum, natural", mat20: "Walnut lumber, 1 inch", mat21: "Paint, interior acrylic latex", mat22: "Paint, enamel, solvent based", mat23: "Polyurethane top coat, water-based, for wood", mat24: "Powder coating, metal stock", mat25: "Wood stain, water based" }; 

export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    this.legendMB = legendMBEnvelope;
    if (props.type === SYSTEM_TYPE_FLOORING) {
      this.legendMB = legendMBFlooring;
    }
    if(props.type === SYSTEM_TYPE_CEILINGS) {
      this.legendMB = legendMBCelings;
    }

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material } }),
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

      if (this.props.currentSel === "GWP") {
        materialColor = this.props.metaData.materialColors[id] ? this.props.metaData.materialColors[id] : '#4d4d4f';
      }

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

  selectChange(e) {
    // this.state.curSel = e.target.value;
    this.setState({ curSel: e.target.value })

  }

  colsForType(type) {
    if(type === SYSTEM_TYPE_FLOORING){
      return colsFlooring;
    }
    if(type === SYSTEM_TYPE_CEILINGS) {
      return colsCeilings;
    }

    return colsEnvelope;
  }

  namesForType(type) {
    if(type === SYSTEM_TYPE_FLOORING){
      return materialNamesFlooring;
    }
    if(type === SYSTEM_TYPE_CEILINGS) {
      return materialNamesCeilings;
    }

    return materialNamesEnvelope;    
  }

  labelForType(type) {
    if(type === SYSTEM_TYPE_FLOORING){
      return materialLabelFlooring;
    }
    if(type === SYSTEM_TYPE_CEILINGS) {
      return materialLabelCeilings;
    }

    return materialLabelEnvelope;    
  }

  render() {
    // console.log(this.props.currentSel);

    if (this.props.currentSel === "GWP") {
      legend = legendGWP;
      legendText = ""
    } else if (this.props.currentSel === "allImpacts") {
      legend = legendGWP;
      legendText = <div className={styles.serif}><p> <span style={{ background: "#87cee9" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Global Warming Potential (kgCO<sub>2</sub>eq/sf)</p> <p> <span style={{ background: "#6495ed" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Non-Renewable Energy Demand (MJ/sf)</p><p> <span style={{ background: "#fcc05e" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Eutrophication Potential (kgNeq/sf)</p> <p> <span style={{ background: "#0090ff" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Smog Formation Potential (kgO<sub>3</sub>eq/sf)</p><p> <span style={{ background: "#85e2bd" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Acidification Potential (kgSO<sub>2</sub>eq/sf)</p> <p> <span style={{ background: "#283cdc" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Ozone Depletion Potential (CFC-11eq/sf)</p></div>
    } else if (this.props.currentSel === "LCS") {
      legend = legendGWP;
      legendText = <div className={styles.serif}><p> <span style={{ background: "#85e2bd" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [A1 - A3] Product </p> <p> <span style={{ background: "#fcc05e" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [A4] Transportation </p><p> <span style={{ background: "#001489" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [B2 - B5] Maintenance and Replacement </p> <p> <span style={{ background: "#4095ee" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [C2 - C4] End of Life </p><p> <span style={{ background: "#a2d3eb" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; [D] Module D </p> </div>
    } else if (this.props.currentSel === "MB") {
      legend = this.legendMB;
      legendText = <div className={styles.serif}><img style={{ maxWidth: "320px" }} src={legend} /><p> <span style={{ background: "#85e2bd" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Exterior Finish </p> <p> <span style={{ background: "#4169e1" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Support System </p> <p> <span style={{ background: "#fcc05e" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Insulation </p> <p> <span style={{ background: "#cccccc" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Other </p></div>
      if (this.props.type === SYSTEM_TYPE_FLOORING) {
        legendText = <div className={styles.serif}><img style={{ maxWidth: "320px" }} src={legend} /><p> <span style={{ background: "#85e2bd" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Flooring Finish </p> <p className={styles.serif}> <span style={{ background: "#4169e1" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Attachment Material </p> <p> <span style={{ background: "#cccccc" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Other </p></div>
      }
      if (this.props.type === SYSTEM_TYPE_CEILINGS) {
        legendText = <div className={styles.serif}>
          <img style={{ maxWidth: "320px" }} src={legend} />
            <p><span style={{ background: "#4169e1" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Support System </p>
            <p className={styles.serif}> <span style={{ background: "#85e2bd" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Finish Material </p>
            <p> <span style={{ background: "#cccccc" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Surface Treatment </p>
        </div>
      }
    } else if (this.props.currentSel === "MH") {
      legend = this.legendMB;
      legendText = <div className={styles.serif}>
      <p> <span style={{ background: "#00a558" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Meets Payette Material Health Policy </p>
      <p> <span style={{ background: "#8cc672" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Meets Payette Material Health Policy with Requests </p> 
      <p> <span style={{ background: "#FEBE10" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Meets some of Payette Material Health Policy </p>
      <p> <span style={{ background: "#D51C29" }}> &nbsp; &nbsp; &nbsp; </span> &nbsp; Does not meet Payette Material Health Policy </p></div>
    }

    let sectionImg = this.props.metaData.sectionIcons[this.state.materialPopup.name];
    let concatNotes = [];
    concatNotes = this.props.metaData.materialNotes[this.state.materialPopup.name];

    let listItems;
    if (this.state.materialPopup.name !== "Material") {
      listItems = this.props.metaData.materialNotes[this.state.materialPopup.name].map((number) =>
        <li>- {number}</li>
      );
    }

    let listItemsHealth;
    if (this.props.hasMaterialHealth) {
      if (this.state.materialPopup.name !== "Material") {
        listItemsHealth = this.props.metaData.materialHealthText[this.state.materialPopup.name].map((number) =>
          <li>- {number}</li>
        );
      }
    }

    return (
      <>
        <div>
          {legendText && <>
            <h3>LEGEND</h3>
            <span>
              {legendText}
              {/* <img style={{maxWidth: "100%", maxHeight: "100%"}} src={legend}/> */}<br></br>
            </span>
          </>}
          <div>
            <h3 style={{ display: "inline-block", marginBottom: "0.5em", textTransform: "uppercase" }}>{this.props.title}</h3><button className={styles.mButton} onClick={e => this.handleSelectAll.bind(this)(e)}>Select All</button>
            {/* <button className={styles.mButton} onClick={e => this.handleSelectAll.bind(this)(e)}>Clear</button> */}
            <div className={styles.sansserif} style={{ fontWeight: "bold", marginBottom: "0.75em", fontSize: "0.9em" }}>Click on type name below for additional details</div>
          </div>

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
            <h2 style={{ fontSize: "40px" }}>{this.props.metaData.materialName2[this.state.materialPopup.name]}</h2>
            <select id="pie1" name="pie1" onChange={this.selectChange.bind(this)}>
              <option value="tenYGWP">Initial Carbon (only Module A)</option>
              <option value="sixty2YGWP">60 year lifespan with Module D and biogenic carbon</option>
              <option value="sixty1YGWP">60 year lifespan with biogenic carbon</option>

            </select>
            <p id="textLabel" style={{ display: "block", width: "100%", position: "relative", textAlign: "left", }}>Hover over chart to see data</p>
            <br></br>
            <div style={{ width: "30%", float: "left", position: "relative", textAlign: "center" }}>
              <Pie
                style={
                  this.props.type === SYSTEM_TYPE_ENVELOPES ? { width: "100%", transform: "scaleX(-1)", zIndex: "-1", marginLeft: "3em" } :
                    { width: "100%", transform: "scaleX(-1)", zIndex: "-1", marginLeft: "3em", position: "absolute" }
                }
                width={600}
                height={400}
                matBreakdown={this.props.matBreakdown}
                matBreakdown1={this.props.matBreakdown1}
                matBreakdown2={this.props.matBreakdown2}
                currentMat={this.state.materialPopup.name}
                tenYGWP={this.props.tenYGWP}
                sixty1YGWP={this.props.sixty1YGWP}
                sixty2YGWP={this.props.sixty2YGWP}
                GWPSel={this.state.curSel}
                cols={this.colsForType(this.props.type)}
                materialNames={this.namesForType(this.props.type)}
                materialLabel={this.labelForType(this.props.type)}
              />

            </div>

            {this.props.type === SYSTEM_TYPE_ENVELOPES ?
              <>
                <img style={{ maxWidth: "45%", top: "-70px", position: "relative", float: "right", objectFit: "cover", display: "block" }} src={sectionImg} alt={`${this.state.materialPopup.name} facade diagram`} />
                <div style={{ maxWidth: "55%", float: "left", position: 'relative' }}>
                  <h4>Assumptions</h4>
                  <ul style={{ lineHeight: '1.4em', fontSize: '16px', paddingLeft: '1em' }}>{listItems}</ul></div>
              </> :
              <>
                <img style={{ maxWidth: "45%", top: "-70px", position: "relative", float: "right", objectFit: "cover", display: "block" }} src={sectionImg} alt={`${this.state.materialPopup.name} facade diagram`} />
                <div style={{ maxWidth: "55%", float: "left", position: 'relative' }}>
                  <div style={{ display: "block" }}><h4>Assumptions</h4>
                    <ul style={{ lineHeight: '1.4em', fontSize: '16px', paddingLeft: '1em' }}>{listItems}</ul></div>
                  <div style={{ position: 'relative', display: 'block' }}><h4>Material Health</h4>
                    <ul style={{ lineHeight: '1.4em', fontSize: '16px', paddingLeft: '1em' }}>{listItemsHealth}</ul></div>
                </div>
              </>}

          </span>

          {this.props.type === SYSTEM_TYPE_FLOORING ? <div style={{ height: "700px" }}>

          </div> : null}
        </Dialog>
      </>
    )
  }
}

