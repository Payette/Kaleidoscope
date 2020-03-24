/* https://codesandbox.io/s/multiselect-checkboxes-oennn */
import React, { PureComponent } from "react";

export default class MaterialList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: props.materials.map(material => { return { label: material, id: material }}).reverse(),
      isShiftDown: false,
      selectedItems: props.materials,
      lastSelectedItem: null
    };

    this.listEl = null;

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleSelectStart = this.handleSelectStart.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.listEl.addEventListener("selectstart", this.handleSelectStart, false);
    this.props.updateSelectedMaterials(this.state.selectedItems);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("keydown", this.handleKeyDown);
    this.listEl.removeEventListener("selectstart", this.handleSelectStart);
  }

  handleSelectStart(e) {
    // if we're clicking the labels it'll select the text if holding shift
    if (this.state.isShiftDown) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    if (e.key === "Shift" && this.state.isShiftDown) {
      this.setState({ isShiftDown: false });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Shift" && !this.state.isShiftDown) {
      this.setState({ isShiftDown: true });
    }
  }

  handleSelectItem(e) {
    const { value } = e.target;
    const nextValue = this.getNextValue(value);

    this.setState({ selectedItems: nextValue, lastSelectedItem: value });
    this.props.updateSelectedMaterials(nextValue);
  }

  getNextValue(value) {
    const { isShiftDown, selectedItems } = this.state;
    const hasBeenSelected = !selectedItems.includes(value);

    if (isShiftDown) {
      const newSelectedItems = this.getNewSelectedItems(value);
      // de-dupe the array using a Set
      const selections = [...new Set([...selectedItems, ...newSelectedItems])];

      if (!hasBeenSelected) {
        return selections.filter(item => !newSelectedItems.includes(item));
      }

      return selections;
    }

    // if it's already in there, remove it, otherwise append it
    return selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value];
  }

  getNewSelectedItems(value) {
    const { lastSelectedItem, items } = this.state;
    const currentSelectedIndex = items.findIndex(item => item.id === value);
    const lastSelectedIndex = items.findIndex(
      item => item.id === lastSelectedItem
    );

    return items
      .slice(
        Math.min(lastSelectedIndex, currentSelectedIndex),
        Math.max(lastSelectedIndex, currentSelectedIndex) + 1
      )
      .map(item => item.id);
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
    return <ul ref={node => (this.listEl = node)}>{this.renderItems()}</ul>;
  }
}
