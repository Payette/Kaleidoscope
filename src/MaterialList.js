/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";
import styles from './css/MaterialList.module.scss';

export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    console.log(props.initialSelectedMaterials);

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material }}).reverse(),
      selectedItems: props.initialSelectedMaterials
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

  renderItems() {
    const { items, selectedItems } = this.state;
    return items.map(item => {
      const { id, label } = item;
      return (
        <li key={id}>
          <input
            onChange={this.handleSelectItem}
            type="checkbox"
            checked={selectedItems.includes(id)}
            value={id}
            id={`item-${id}`}
          />
          <label htmlFor={`item-${id}`}>{label}</label>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <button onClick={e => this.handleSelectAll.bind(this)(e)}>Select All</button>
        <ul ref={node => (this.listEl = node)}>{this.renderItems()}</ul>
      </div>
    )
  }
}
