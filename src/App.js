import React, { Component } from 'react';
import './App.css';
import HorizontalBarChart from './HorizontalBarChart';
import StackedBarChart from './StackedBarChart';
import LoadData from './data/LoadData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: "allImpacts",
      allImpactsData: [],
      gwpData: []

    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    LoadData.allImpactsData(data => this.setState({ allImpactsData: data }));
    LoadData.gwpData(data => this.setState({ gwpData: data }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      console.log('new state: ', this.state);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>LCA Tool</h1>

          <form>
            <p>CHART TYPE:</p>
            <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
            <label htmlFor="allImpacts">All Impacts</label>
            <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
            <label for="fGWP">Global Warming Potential</label>
            <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
            <label for="LCS">Life Cycle Stage</label>
            <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
            <label for="MB">Material Breakdown</label>

            <p>LIFESPAN:</p>
            <input type="radio" id="tenY" name="lifeSpan" value="tenY" checked="checked" />
            <label for="tenY">10 Year (No Mod D.)</label>
            <input type="radio" id="sixty1" name="lifeSpan" value="sixty1" />
            <label for="sixty1">60 Year (With Mod D)</label>
            <input type="radio" id="sixty2" name="lifeSpan" value="sixty2" />
            <label for="sixty2">60 Year (No Mod D)</label>

            <p>BIOGENIC CARBON:</p>
            <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked="checked" />
            <label for="yBio">With Biogenic Carbon</label>
            <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" />
            <label for="nBio">No Biogenic Carbon</label>

        </form>

        <div className="chartContainer">
        {this.state.chartType === "allImpacts" && this.state.allImpactsData.length > 0 && <StackedBarChart
          data={this.state.allImpactsData}
          height={600}
          xAxisLabel="kg CO2eq ??"
        />}

        {this.state.chartType === "GWP" && this.state.gwpData.length > 0 && <HorizontalBarChart
          data={this.state.gwpData}
          height={600}
          xAxisLabel="kg CO2eq"
        />}
        </div>




      </div>
    );
  }
}

export default App;
