/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";
import styles from './css/MaterialList.module.scss';
import Dialog from 'react-a11y-dialog';
import materialPopupMock from './images/popupmock.png';
import { render } from 'react-dom'
import Checkbox from './Checkbox'

import 'pretty-checkbox'
let myImg;

export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material }}),
      selectedItems: props.initialSelectedMaterials,
      materialPopup: {
        name: "Material"
      },
      checked: true
    };

    this.listEl = null;
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  // const [checked, setChecked] = React.useState(false);
  // const hangleChange = React.useCallback(() => {
  //   setChecked(prev => !prev)
  // }, [])

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

    console.log(material);
    myImg = './images/' + material.id + '.png';

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

      let materialColor = '#ccc';

      if(this.props.currentSel=="GWP"){
        materialColor = this.props.metaData.materialColors[id] ? this.props.metaData.materialColors[id] : '#CCCCCC';
      }

      
      const materialIcon = this.props.metaData.materialIcons[id] ? this.props.metaData.materialIcons[id] : undefined;
      const materialType = this.props.metaData.materialType[id] ? this.props.metaData.materialType[id] : undefined;

      return (
        
        <li key={id} className={styles.material}>
          
          {/* <Checkbox state='checked'></Checkbox> */}
          {/* {materialIcon && <img src={materialIcon} alt="material icon" className={styles.materialIcon}/>} */}
          {/* <div className={styles.materialGraphic} style={{backgroundColor: materialColor}}></div> */}
          {/* <section title=".squaredOne"> */}
    {/* <!-- .squaredOne --> */}
    {/* <div className={styles.squaredOne}>
      <input type="checkbox" value="None" id="squaredOne" name="check" checked />
      <label for="squaredOne"></label>
    </div> */}
    {/* <!-- end .squaredOne --> */}
  {/* </section> */}

  {/* <input
            onChange={this.handleSelectItem}
            type="checkbox"
            checked={selectedItems.includes(id)}
            value={id}
            id={`item-${id}`}
            name="check"
          /> */}

  {/* <div style={{ fontFamily: 'system-ui' }}> */}
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
          {/* <span style={{ marginLeft: 8 }}>Label Text</span> */}
        </label>
      {/* </div> */}


    {/* <div className={styles.squaredOne}>
      <input type="checkbox" value="None" id={styles.squaredOne} name="check" checked />
      <label for={styles.squaredOne}></label>
    </div> */}

    
          
          {/* <label htmlFor={`item-${id}`}>{label}</label> */}
          
          <button className={styles.moreInformationButton} onClick={event => this.showMaterialsPopup.bind(this)(event, item)}><label className={styles.mLabel} htmlFor={`item-${id}`}>{materialType}</label></button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          LEGEND:
          <p>
            something
          </p>
          <p>
            something
          </p>
        </div>
        
        <ul className={styles.container} ref={node => (this.listEl = node)}>{this.renderItems()}
        <button className={styles.mButton} onClick={e => this.handleSelectAll.bind(this)(e)}>Select All</button>
        </ul>

        <Dialog id="materialdetailsdialog"
          appRoot="#root"
          dialogRoot="#dialog-root"
          dialogRef={(dialog) => (this.materialsDialogRef = dialog)}
          title={this.state.materialPopup.name}
          classNames={{
            overlay: "dialog-overlay",
            closeButton: "dialog-close",
            element: "dialog-content",
            base: "dialog"
          }}
          >
            <p>
              <img style={{maxWidth: "100%", maxHeight: "100%"}} src={materialPopupMock} alt={`${this.state.materialPopup.name} facade diagram`} />
              <img src={myImg} alt="material icon" className={styles.materialIcon}/>
              Assumptions: Description of system
            </p>
        </Dialog>
      </div>
    )
  }
}

