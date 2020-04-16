/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";
import styles from './css/MaterialList.module.scss';
import Dialog from 'react-a11y-dialog';
import materialPopupMock from './images/popupmock.png';

export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material }}),
      selectedItems: props.initialSelectedMaterials,
      materialPopup: {
        name: "Material"
      }
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

    this.setState({
      materialPopup: {
        name: material.label
      }
    }, () => {
      this.materialsDialogRef.show();
    })    
  } 

  renderItems() {
    const { items, selectedItems } = this.state;
    return items.map(item => {
      const { id, label } = item;

      const materialColor = this.props.metaData.materialColors[id] ? this.props.metaData.materialColors[id] : '#000000';
      const materialIcon = this.props.metaData.materialIcons[id] ? this.props.metaData.materialIcons[id] : undefined;

      return (
        <li key={id} className={styles.material}>
          {materialIcon && <img src={materialIcon} alt="material icon" className={styles.materialIcon}/>}
          <div className={styles.materialGraphic} style={{backgroundColor: materialColor}}></div>
          <input
            onChange={this.handleSelectItem}
            type="checkbox"
            checked={selectedItems.includes(id)}
            value={id}
            id={`item-${id}`}
          />
          <label htmlFor={`item-${id}`}>{label}</label>
          <button className={styles.moreInformationButton} onClick={event => this.showMaterialsPopup.bind(this)(event, item)}>More information</button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={e => this.handleSelectAll.bind(this)(e)}>Select All</button>
        <ul className={styles.container} ref={node => (this.listEl = node)}>{this.renderItems()}</ul>

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
            </p>
        </Dialog>
      </div>
    )
  }
}
