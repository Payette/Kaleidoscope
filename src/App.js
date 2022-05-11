import React, { Component } from 'react';
import _ from 'lodash';
import StackedBarChart from './StackedBarChart';
import FlooringStackedBarChart from './Flooring_StackedBarChart';
import LoadData from './data/LoadData1';
import FlooringLoadData from './data/Flooring_LoadData';
import MaterialList from './MaterialList';
import FlooringMaterialList from './Flooring_MaterialList';
import Comp from "./Comp";
import Row from "./Row";
import Flooring_Row from "./Flooring_Row";
import { Tabs, AppBar, Tab, Popover, Button, Typography, Popper } from '@material-ui/core';
import TabPanel from "./TabPanel";
import withSplashScreen from './withSplashScreen';
import Dialog from 'react-a11y-dialog';


// import Helmet from 'Helmet';
import { Helmet } from "react-helmet";

import './css/Main.scss';
import styles from './css/App.module.scss';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 1,
      chartType: "GWP",
      lifespan: "tenY",
      biogenicCarbon: "yBio",
      allImpactsData: [],
      gwpData: [],
      lcsData: [],
      materialData: [],
      allImpactsData1: [],
      gwpData1: [],
      lcsData1: [],
      materialData1: [],
      allImpactsData2: [],
      gwpData2: [],
      lcsData2: [],
      materialData2: [],
      allImpactsData3: [],
      gwpData3: [],
      lcsData3: [],
      materialData3: [],
      allImpactsData4: [],
      gwpData4: [],
      lcsData4: [],
      materialData4: [],
      allImpactsData5: [],
      gwpData5: [],
      lcsData5: [],
      materialData5: [],
      materials: [],
      selectedMaterials: [],

      flooring_allImpactsData: [],
      flooring_gwpData: [],
      flooring_lcsData: [],
      flooring_materialData: [],
      flooring_allImpactsData1: [],
      flooring_gwpData1: [],
      flooring_lcsData1: [],
      flooring_materialData1: [],
      flooring_allImpactsData2: [],
      flooring_gwpData2: [],
      flooring_lcsData2: [],
      flooring_materialData2: [],
      flooring_allImpactsData3: [],
      flooring_gwpData3: [],
      flooring_lcsData3: [],
      flooring_materialData3: [],
      flooring_allImpactsData4: [],
      flooring_gwpData4: [],
      flooring_lcsData4: [],
      flooring_materialData4: [],
      flooring_allImpactsData5: [],
      flooring_gwpData5: [],
      flooring_lcsData5: [],
      flooring_materialData5: [],
      flooring_materials: [],
      flooring_selectedMaterials: [],


      currentRadio: 1,
      rows: [
        { value: 'row1', checked: false },
        { value: 'row2', checked: false },
      ],
      value: parseInt(props.item),
      anchorEl: null,
      currentToolTip: null,
      systemString: "",
      lens: "0_0_0",
      shareableUrl: "https://engine.payette.com/static/kaleidoscope-staging/"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    console.log(props)
  }



  handleClick = (e) => {
    this.setAnchorEl(e.currentTarget);
    // console.log(e.target.id)
  }


  handleClose = () => {
    this.setAnchorEl(null)
  }

  setAnchorEl = (target) => {
    // this.setState()
    let placeholder = null
    if (target) {
      placeholder = target.id
    }
    // console.log(target.id)
    this.setState({ anchorEl: target, currentToolTip: placeholder });
    console.log(this.state.anchorEl)
  }


  handleChange = (event, newValue) => { // tab button click

    

    // const [value, setValue] = React.useState(0);
    let value = newValue
    console.log(newValue)
    console.log(this.state.materials)
    if(this.state.selectedMaterials.length != 0){
      this.setState({ value: newValue, selectedMaterials: this.state.selectedMaterials });
    }else{
      this.setState({ value: newValue, selectedMaterials: this.state.materials });
    }

    if(this.state.flooring_selectedMaterials.length != 0){
      this.setState({ value: newValue, flooring_selectedMaterials: this.state.flooring_selectedMaterials });
    }else{
      this.setState({ value: newValue, flooring_selectedMaterials: this.state.flooring_materials });
    }
    

    let urlVar = new URLSearchParams()
      urlVar.set("type", newValue)
      // urlVar.set("system", this.state.systemString)

      // urlVar.set("chartType", this.state.chartType)
      // urlVar.set("lifespan", this.state.lifespan)
      // urlVar.set("biogenicCarbon", this.state.biogenicCarbon)

      // chartType: "GWP",
      // lifespan: "tenY",
      // biogenicCarbon: "yBio",

      
      // console.log(this.state.selectedMaterials)
      // console.log(s.get("system"))

      window.history.replaceState({}, '', "?" + urlVar.toString())

  
  };

  updateValue = (e, idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].value = e.target.value;
    this.setState({
      rows,
    });
  }

  onChecked = (idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].checked = !rows[idx].checked;
    this.setState({
      rows,
    });
  }

  addRow = () => {
    const rows = [...this.state.rows,
    { value: '', checked: false }
    ];
    this.setState({
      rows,
    });
  }

  deleteRows = () => {
    let oh = this.state.rows.pop();
    this.setState({
      rows: this.state.rows
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevState, this.state)) {

     

      let urlSystems = []
      // for(let i = 0; i < this.state.selectedMaterials.length; i++){

      // }
      let s = new URLSearchParams(window.location.search)

      let type = s.get("type")
      let mSystem = s.get("system")
      let mLenses = s.get("lens")


      let mChartType = s.get("chartType")
      let mLifespan = s.get("lifespan")
      let mBiogenicCarbon = s.get("biogenicCarbon")
      // urlVar.set("chartType", this.state.chartType)
      // urlVar.set("lifespan", this.state.lifespan)
      // urlVar.set("biogenicCarbon", this.state.biogenicCarbon)

    console.log(mSystem)
    if(mSystem == null){
      mSystem = "0_1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_"
    }
    if(type == null){
      type = 0
    }
    if(mLenses == null){
      mLenses = "0_0_0"
    }

    if(mChartType == null){
      mChartType = this.state.chartType
    }

    if(mLifespan == null){
      mLifespan = this.state.lifespan
    }

    if(mBiogenicCarbon == null){
      mBiogenicCarbon = this.state.biogenicCarbon
    }


    this.setState({
      systemString: mSystem,
      chartType: mChartType,
      lifespan: mLifespan,
      biogenicCarbon: mBiogenicCarbon
      })
    if (type == 0) { //envelope
      let names = mSystem.split("_")

      names.pop()

      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
    ]
      let urlSelectedMaterials = []

      for(let i = 0; i < names.length; i++){
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      this.setState(
        { value: 0,
        systemString: mSystem,
      selectedMaterials: urlSelectedMaterials }
      )
    } else if(type == 1){ //flooring
      let names = mSystem.split("_")

      names.pop()

      let allSystems = [
       "sGranite",
    "sSlate",
    "sCeramic",
    "rRubber",
    "rVinyl",
    "rLinoTile",
    "mConcrete",
    "mTerrazzo",
    //"mSealedC",
    "mEpoxy",
    "cHigh",
    "cMedium",
    "cLow",
    "wEngineered",
    "wBamboo",
    "wCork",
    "wSoftwood",
    "wHardwood"
    ]
      let urlSelectedMaterials = []

      for(let i = 0; i < names.length; i++){
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      this.setState(
        { value: 1,
        systemString: mSystem,
      flooring_selectedMaterials: urlSelectedMaterials }
      )
        }


      let urlVar = new URLSearchParams()
      urlVar.set("type", this.state.value)
      urlVar.set("system", this.state.systemString)

      // urlVar.set("chartType", this.state.chartType)
      // urlVar.set("lifespan", this.state.lifespan)
      // urlVar.set("biogenicCarbon", this.state.biogenicCarbon)

      
      // console.log(this.state.selectedMaterials)
      console.log(s.get("system"))

      // window.history.replaceState({}, '', "?" + urlVar.toString())

      // window.history.replace = urlVar.toString()
    }
  }

  



  componentDidMount() {



    let s = new URLSearchParams(window.location.search)

    console.log(s.get("type"))
    console.log(s.get("system"))



    let type = s.get("type")
    console.log(type)
    let mSystem = s.get("system")
    console.log(mSystem)
    this.setState({systemString: mSystem})
    if (type == 0) { //envelope
      let names = this.state.systemString.split("_")

      names.pop()

      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
    ]

      let urlSelectedMaterials = []

      console.log(names)
      for(let i = 0; i < names.length; i++){
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      console.log(urlSelectedMaterials)

      this.setState(
        { value: 0,
        systemString: mSystem,
      selectedMaterials: urlSelectedMaterials }
      )
    } else if (type == 1) { //envelope
      let names = this.state.systemString.split("_")

      names.pop()

      let allSystems = [
        "sGranite",
     "sSlate",
     "sCeramic",
     "rRubber",
     "rVinyl",
     "rLinoTile",
     "mConcrete",
     "mTerrazzo",
     //"mSealedC",
     "mEpoxy",
     "cHigh",
     "cMedium",
     "cLow",
     "wEngineered",
     "wBamboo",
     "wCork",
     "wSoftwood",
     "wHardwood"
     ]

      let urlSelectedMaterials = []

      console.log(names)
      for(let i = 0; i < names.length; i++){
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      // console.log(urlSelectedMaterials)

      this.setState(
        { value: 1,
        systemString: mSystem,
      flooring_selectedMaterials: urlSelectedMaterials }
      )
    }



    
    




    LoadData.lcsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });


    LoadData.allImpactsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });



    LoadData.materialData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData(data => this.setState({ gwpData: data }));

    FlooringLoadData.gwpData(data => this.setState({ flooring_gwpData: data }));
    // FlooringLoadData.healthyMatsData(data => this.setState({ flooring_healthyMatsData: data }));

    LoadData.lcsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData1: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData1: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.allImpactsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData1: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData1: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.materialData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData1: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData1: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData1(data => this.setState({ gwpData1: data }));

    FlooringLoadData.gwpData1(data => this.setState({ flooring_gwpData1: data }));
    // FlooringLoadData.healthyMatsData1(data => this.setState({ flooring_healthyMatsData1: data }));

    LoadData.lcsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData2: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData2: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.allImpactsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData2: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData2: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.materialData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData2: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData2: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData2(data => this.setState({ gwpData2: data }));

    FlooringLoadData.gwpData2(data => this.setState({ flooring_gwpData2: data }));
    // FlooringLoadData.healthyMatsData2(data => this.setState({ flooring_healthyMatsData2: data }));

    LoadData.lcsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData3: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData3: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.allImpactsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData3: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData3: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.materialData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData3: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData3: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData3(data => this.setState({ gwpData3: data }));

    FlooringLoadData.gwpData3(data => this.setState({ flooring_gwpData3: data }));
    // FlooringLoadData.healthyMatsData3(data => this.setState({ flooring_healthyMatsData3: data }));

    LoadData.lcsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData4: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData4: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.allImpactsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData4: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData4: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.materialData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData4: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData4: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData4(data => this.setState({ gwpData4: data }));

    FlooringLoadData.gwpData4(data => this.setState({ flooring_gwpData4: data }));
    // FlooringLoadData.healthyMatsData4(data => this.setState({ flooring_healthyMatsData4: data }));

    LoadData.lcsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData5: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.lcsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_lcsData5: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.allImpactsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData5: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.allImpactsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_allImpactsData5: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.materialData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData5: data,
        materials: materials,
        // selectedMaterials: materials,
        names: names
      });
    });

    FlooringLoadData.materialData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        flooring_materialData5: data,
        flooring_materials: materials,
        // flooring_selectedMaterials: materials,
        flooring_names: names
      });
    });

    LoadData.gwpData5(data => this.setState({ gwpData5: data }));

    FlooringLoadData.gwpData5(data => this.setState({ flooring_gwpData5: data }));
    // FlooringLoadData.healthyMatsData5(data => this.setState({ flooring_healthyMatsData5: data }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      // console.log('new state: ', this.state);
    });
  }

  constructURL(){

    console.log(this.state.value)
    let urlVar = new URLSearchParams()
      urlVar.set("type", this.state.value)
      let selectedString = ""
      if(this.state.value == 0){
        
    // for(let i = 0; i < newSelectedMaterials.length; i++){
      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
    ]
    for(let i = 0; i < allSystems.length; i++){
      if(this.state.selectedMaterials.includes(allSystems[i])){
      selectedString += i + "_"
      }
    }
      }else{
        let allSystems = [
          "sGranite",
       "sSlate",
       "sCeramic",
       "rRubber",
       "rVinyl",
       "rLinoTile",
       "mConcrete",
       "mTerrazzo",
       //"mSealedC",
       "mEpoxy",
       "cHigh",
       "cMedium",
       "cLow",
       "wEngineered",
       "wBamboo",
       "wCork",
       "wSoftwood",
       "wHardwood"
       ]
      for(let i = 0; i < allSystems.length; i++){
        if(this.state.flooring_selectedMaterials.includes(allSystems[i])){
        selectedString += i + "_"
        }
      }
      }
      urlVar.set("system", selectedString)

      urlVar.set("chartType", this.state.chartType)
      urlVar.set("lifespan", this.state.lifespan)
      urlVar.set("biogenicCarbon", this.state.biogenicCarbon)

      // console.log("payette.github.com/?"+urlVar.toString())

      // alert("payette.github.com/?"+urlVar.toString())

      this.setState({
        shareableUrl: "https://engine.payette.com/static/kaleidoscope-staging/?"+urlVar.toString()
        // materialPopup: {
        //   name: material.label
        // }
      }, () => {
        this.materialsDialogRef.show();
      })

     
  }

  updateSelectedMaterials(newSelectedMaterials) {
    let selectedString = ""
    // for(let i = 0; i < newSelectedMaterials.length; i++){
      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
    ]
    for(let i = 0; i < allSystems.length; i++){
      if(newSelectedMaterials.includes(allSystems[i])){
      selectedString += i + "_"
      }
    }

    this.setState({systemString: selectedString})

    let urlVar = new URLSearchParams()
      urlVar.set("type", this.state.value)
      // urlVar.set("system", this.state.systemString)

      
      // console.log(this.state.selectedMaterials)
      // console.log(s.get("system"))
      this.setState({
        selectedMaterials: newSelectedMaterials
      })

      

    urlVar.set("system", selectedString)


    window.history.replaceState({}, '', "?" + urlVar.toString())

   

    // this.setState({systemString: selectedString})
    // }
   
  }

  updateSelectedFlooringMaterials(flooring_newSelectedMaterials) {


    let selectedString = ""
    // for(let i = 0; i < newSelectedMaterials.length; i++){
      let allSystems = [
        "sGranite",
     "sSlate",
     "sCeramic",
     "rRubber",
     "rVinyl",
     "rLinoTile",
     "mConcrete",
     "mTerrazzo",
     //"mSealedC",
     "mEpoxy",
     "cHigh",
     "cMedium",
     "cLow",
     "wEngineered",
     "wBamboo",
     "wCork",
     "wSoftwood",
     "wHardwood"
     ]
    for(let i = 0; i < allSystems.length; i++){
      if(flooring_newSelectedMaterials.includes(allSystems[i])){
      selectedString += i + "_"
      }
    }

    this.setState({systemString: selectedString})

    let urlVar = new URLSearchParams()
      urlVar.set("type", this.state.value)
      // urlVar.set("system", this.state.systemString)

      
      // console.log(this.state.selectedMaterials)
      // console.log(s.get("system"))
      this.setState({
        flooring_selectedMaterials: flooring_newSelectedMaterials
      })

      

    urlVar.set("system", selectedString)

    
    window.history.replaceState({}, '', "?" + urlVar.toString())



    
  }

  radioChange(e) {
    console.log(e.target.value)
    let currentRad = e.target.value;

    this.state.currentRadio = currentRad;
    this.setState({ currentRadio: currentRad });
    console.log(this.state.currentRadio)
  }







  render() {

    // console.log(this.state.flooring_names)



    const open = Boolean(this.state.anchorEl);

    const id = open ? 'simple-popover' : undefined;



    const allImpactsDataSelectedMaterialsOnly = this.state.allImpactsData.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly = this.state.gwpData.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly = this.state.lcsData.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly = this.state.materialData.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly1 = this.state.allImpactsData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly1 = this.state.gwpData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly1 = this.state.lcsData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly1 = this.state.materialData1.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly2 = this.state.allImpactsData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly2 = this.state.gwpData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly2 = this.state.lcsData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly2 = this.state.materialData2.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly3 = this.state.allImpactsData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly3 = this.state.gwpData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly3 = this.state.lcsData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly3 = this.state.materialData3.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly4 = this.state.allImpactsData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly4 = this.state.gwpData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly4 = this.state.lcsData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly4 = this.state.materialData4.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly5 = this.state.allImpactsData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly5 = this.state.gwpData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly5 = this.state.lcsData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly5 = this.state.materialData5.filter(d => this.state.selectedMaterials.includes(d.material));





    const allImpactsDataSelectedMaterialsOnlyFlooring = this.state.flooring_allImpactsData.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnlyFlooring = this.state.flooring_gwpData.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnlyFlooring = this.state.flooring_lcsData.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnlyFlooring = this.state.flooring_materialData.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnlyFlooring = this.state.flooring_healthyMatsData.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    const allImpactsDataSelectedMaterialsOnly1Flooring = this.state.flooring_allImpactsData1.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly1Flooring = this.state.flooring_gwpData1.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly1Flooring = this.state.flooring_lcsData1.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly1Flooring = this.state.flooring_materialData1.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnly1Flooring = this.state.flooring_healthyMatsData1.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    const allImpactsDataSelectedMaterialsOnly2Flooring = this.state.flooring_allImpactsData2.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly2Flooring = this.state.flooring_gwpData2.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly2Flooring = this.state.flooring_lcsData2.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly2Flooring = this.state.flooring_materialData2.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnly2Flooring = this.state.flooring_healthyMatsData2.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    const allImpactsDataSelectedMaterialsOnly3Flooring = this.state.flooring_allImpactsData3.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly3Flooring = this.state.flooring_gwpData3.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly3Flooring = this.state.flooring_lcsData3.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly3Flooring = this.state.flooring_materialData3.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnly3Flooring = this.state.flooring_healthyMatsData3.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    const allImpactsDataSelectedMaterialsOnly4Flooring = this.state.flooring_allImpactsData4.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly4Flooring = this.state.flooring_gwpData4.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly4Flooring = this.state.flooring_lcsData4.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly4Flooring = this.state.flooring_materialData4.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnly4Flooring = this.state.flooring_healthyMatsData4.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    const allImpactsDataSelectedMaterialsOnly5Flooring = this.state.flooring_allImpactsData5.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly5Flooring = this.state.flooring_gwpData5.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly5Flooring = this.state.flooring_lcsData5.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly5Flooring = this.state.flooring_materialData5.filter(d => this.state.flooring_selectedMaterials.includes(d.material));
    // const healthyMatsDataSelectedMaterialsOnly5Flooring = this.state.flooring_healthyMatsData5.filter(d => this.state.flooring_selectedMaterials.includes(d.material))

    var obj = {
      "Material": "void"
    };


    for (let i = 0; i < gwpDataSelectedMaterialsOnly.length; i++) {
      let myName = gwpDataSelectedMaterialsOnly[i].material;
      let myVal = gwpDataSelectedMaterialsOnly[i].value;
      obj[myName] = myVal;
    }

    var flooring_obj = {
      "Material": "void"
    };


    for (let i = 0; i < gwpDataSelectedMaterialsOnlyFlooring.length; i++) {
      let myName = gwpDataSelectedMaterialsOnlyFlooring[i].material;
      let myVal = gwpDataSelectedMaterialsOnlyFlooring[i].value;
      flooring_obj[myName] = myVal;
    }

    let chartTitle = "";


    if (this.state.chartType === "GWP") {
      chartTitle = "Global Warming Potential"
    } else if (this.state.chartType === "allImpacts") {
      chartTitle = "All Impacts"
    } else if (this.state.chartType === "LCS") {
      chartTitle = "Life Cycle Stage"
    } else if (this.state.chartType === "MB") {
      chartTitle = "Material Breakdown"
    } else if (this.state.chartType === "MH") {
      chartTitle = "Material Health Impact"
    }



    // DETERMINE THE SIZE OF THE ENVELOPE CALCULATOR
    let sidebar1 = document.getElementById("sidebar123");
    let parentD = document.getElementById("parentDiv");

    let calcWidth = 31
    let sidebarHeight = 0

    if (sidebar1 && parentD && window.innerWidth > 1200) {
      sidebarHeight = 300 + sidebar1.offsetHeight;
      // if(parseInt(sidebar1.offsetHeight) >= parseInt(parentD.offsetHeight)){
      calcWidth = (((window.innerWidth - 355) - (window.innerWidth / 25)) / 2) / window.innerWidth * 100
      // }
    } else if (window.innerWidth <= 1200 && window.innerWidth > 800) {
      calcWidth = 48
    } else {
      calcWidth = 98
    }

    var divStyle = {
      width: calcWidth + '%',
      display: 'inline-block',
      marginRight: '1%',
      marginLeft: '1%',
      marginBottom: "10px"
    };


    return (



      <div className="App" style={{ minHeight: sidebarHeight }}>

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
                style={{width:500}}
                >
                  <span>
                  <h2 style={{fontSize: "40px"}}>Copy Link Below to Share URL</h2>
                    <h2 style={{fontSize: "12px", textAlign:"center"}}>{this.state.shareableUrl}</h2>
                    
                  </span>
              </Dialog>

              <h3 style={{position:"absolute", right:"25px", top:"120px"}}>
              <button onClick={this.constructURL.bind(this)} style={{borderRadius:"5px", padding:"5px"}}>Share Link</button>
              </h3>
        
        <AppBar position="static" style={{ background: 'white', color: 'black', boxShadow: "none" }}>
          <Tabs value={this.state.value} indicatorColor="secondary" textColor="secondary"
            centered onChange={this.handleChange}>
            <Tab label="ENVELOPE" />
            <Tab label="FLOORING" />
            <Tab label="OTHER" disabled />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
        <Helmet>
         
          <script type="text/javascript" src="bf.js"></script>
        </Helmet>

        

        

        

          <form>
            <h1>ENVELOPE ASSEMBLIES</h1>
            
            <div className={styles.topcontrols}>

              <div className={styles.inputgroup}>
                <h3>CHART TYPE</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                  <label htmlFor="fGWP">Global Warming Potential <sup id="fnref:1"><a href="#fn:1" rel="footnote"></a></sup></label>

                  
                </div>

                <div className={styles.inputitem}>
                  <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                  <label htmlFor="allImpacts">All Impacts <sup id={"fnref:2"}><a href={"#fn:2"} rel="footnote"></a></sup></label>

                 
                </div>

                <div className={styles.inputitem}>
                  <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
                  <label htmlFor="LCS">Life Cycle Stage</label> <sup id="fnref:3"><a href="#fn:3" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
                  <label htmlFor="MB">Material Breakdown</label> <sup id="fnref:4"><a href="#fn:4" rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>LIFESPAN</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="tenY" name="lifespan" value="tenY" checked={this.state.lifespan === "tenY"} onChange={this.handleInputChange} />
                  <label htmlFor="tenY">Initial Carbon (only Module A)</label> <sup id="fnref:5"><a href="#fn:5" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty2">60 Year (With Module D)</label> <sup id="fnref:6"><a href="#fn:6" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty1">60 Year (No Module D)</label> <sup id="fnref:7"><a href="#fn:7" rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>BIOGENIC CARBON</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked={this.state.biogenicCarbon === "yBio"} onChange={this.handleInputChange} />
                  <label htmlFor="yBio">With Biogenic Carbon</label> <sup id="fnref:8"><a href="#fn:8" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" checked={this.state.biogenicCarbon === "nBio"} onChange={this.handleInputChange} />
                  <label htmlFor="nBio">No Biogenic Carbon</label> <sup id="fnref:9"><a href="#fn:9" rel="footnote"></a></sup>
                </div>
              </div>
            </div>

          </form>
          <div style={{ display: "inline-block", height: "100%" }} id="parentDiv">

            {this.state.materials.length > 0 &&
              <div className={styles.sidebar} id="sidebar123">
                <MaterialList
                  gwp={obj}
                  materials={this.state.materials}
                  names={this.state.names}
                  updateSelectedMaterials={this.updateSelectedMaterials.bind(this)}
                  initialSelectedMaterials={this.state.selectedMaterials}
                  metaData={LoadData.metaData}
                  currentSel={this.state.chartType}
                  matBreakdown={this.state.materialData1}
                  matBreakdown1={this.state.materialData3}
                  matBreakdown2={this.state.materialData5}
                  tenYGWP={this.state.gwpData1}
                  sixty1YGWP={this.state.gwpData3}
                  sixty2YGWP={this.state.gwpData5}
                />
              </div>
            }
            <h2>{chartTitle}</h2>
            {/* GLOBAL WARMING POTENTIAL */}
            <div className={styles.chartContainer}>
              {this.state.chartType === "GWP" && this.state.gwpData.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly}
                allMaterials={this.state.gwpData}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly}
                allMaterials={this.state.allImpactsData}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly}
                allMaterials={this.state.lcsData}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly}
                allMaterials={this.state.materialData}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}




              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.gwpData1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly1}
                allMaterials={this.state.gwpData1}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly1}
                allMaterials={this.state.allImpactsData1}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly1}
                allMaterials={this.state.lcsData1}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly1}
                allMaterials={this.state.materialData1}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}





              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.gwpData2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly2}
                allMaterials={this.state.gwpData2}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly2}
                allMaterials={this.state.allImpactsData2}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly2}
                allMaterials={this.state.lcsData2}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly2}
                allMaterials={this.state.materialData2}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}





              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.gwpData3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly3}
                allMaterials={this.state.gwpData3}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly3}
                allMaterials={this.state.allImpactsData3}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly3}
                allMaterials={this.state.lcsData3}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly3}
                allMaterials={this.state.materialData3}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}



              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.gwpData4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly4}
                allMaterials={this.state.gwpData4}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly4}
                allMaterials={this.state.allImpactsData4}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly4}
                allMaterials={this.state.lcsData4}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly4}
                allMaterials={this.state.materialData4}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}





              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.gwpData5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly5}
                allMaterials={this.state.gwpData5}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly5}
                allMaterials={this.state.allImpactsData5}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly5}
                allMaterials={this.state.lcsData5}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly5}
                allMaterials={this.state.materialData5}
                metaData={LoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              <div>


              </div>

            </div>
          </div>


          <div style={{ display: "inline-block", width: "100%" }}>
            <h1>ENVELOPE CALCULATOR</h1>
            <div className={styles.calc} style={{ minHeight: '60px', display: "block" }}>

              <div style={{ margin: "auto" }}>
                <input type="radio" id="ten" name={"gender"} value="1" onChange={this.radioChange.bind(this)} defaultChecked></input>
                <label for="ten"> Initial Carbon (only Module A) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty2" name={"gender"} value="3" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty2"> 60 Year (with Module D) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty1" name={"gender"} value="2" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty1"> 60 Year (no Module D) &nbsp;&nbsp;</label>



              </div><br></br>

              {this.state.rows.map((row, idx) => {
                return (
                  <Row
                    key={idx}
                    value={row.value}
                    checked={row.checked}
                    name={idx + 1}
                    count={0}
                    tenY={this.state.gwpData1}
                    sixty1={this.state.gwpData3}
                    sixty2={this.state.gwpData5}
                    radio={this.state.currentRadio}
                    divStyle={divStyle}
                    onChange={(e) => this.updateValue(e, idx)}
                    onChecked={() => this.onChecked(idx)}
                  />
                )
              })
              }
              <br></br>

              <button onClick={this.addRow}>
                Add Option
                </button>
                  <button onClick={this.deleteRows}>
                    Delete Option
              </button>


              <br></br>


            </div>

            <div style={{ paddingTop: 0, top: 0, marginTop: 0 }}>
              <p style={{ display: "inline-block", fontFamily:"'freight-text-pro', serif"}}>
                Last updated April 2021<br></br>
              Credit: <i>Data analysis run using Tally version 2020.06.09.01 by KT Innovations, thinkstep, and Autodesk using industry standard EPDs unless otherwise noted </i><br></br>
              For questions or comments: <h5 style={{display:"inline-block"}}>tools@payette.com</h5>
              </p>
            </div>
           
          </div>


          <br></br>



        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        <Helmet>
     
          <script type="text/javascript" src="bf3.js"></script>
        </Helmet>
          <form>
            <h1>FLOOR ASSEMBLIES</h1>
            <div className={styles.topcontrols}>

              <div className={styles.inputgroup} style={{minHeight:195}}>
                <h3>CHART TYPE</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                  <label htmlFor="fGWP">Global Warming Potential <sup id={"fnref:11"}><a href={"#fn:11"} rel="footnote"></a></sup></label>
                  
                </div>

                <div className={styles.inputitem}>
                  <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                  <label htmlFor="allImpacts">All Impacts <sup id={"fnref:"+this.state.clicks+"2"}><a href={"#fn:"+this.state.clicks+"2"} rel="footnote"></a></sup></label>

                  
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
                  <label htmlFor="LCS">Life Cycle Stage</label> <sup id={"fnref:"+this.state.clicks+"3"}><a href={"#fn:"+this.state.clicks+"3"}  rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
                  <label htmlFor="MB">Material Breakdown</label> <sup id={"fnref:"+this.state.clicks+"4"}><a href={"#fn:"+this.state.clicks+"4"}  rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="MH" value="MH" name="chartType" checked={this.state.chartType === "MH"} onChange={this.handleInputChange} />
                  <label htmlFor="MH">Material Health Impacts</label> <sup id="fnref:10"><a href="#fn:10" rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup} style={{minHeight:195}}>
                <h3>LIFESPAN</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="tenY" name="lifespan" value="tenY" checked={this.state.lifespan === "tenY"} onChange={this.handleInputChange} />
                  <label htmlFor="tenY">Initial Carbon (only Module A)</label> <sup id={"fnref:"+this.state.clicks+"5"}><a href={"#fn:"+this.state.clicks+"5"}  rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty2">60 Year (With Module D)</label> <sup id={"fnref:"+this.state.clicks+"6"}><a href={"#fn:"+this.state.clicks+"6"}  rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty1">60 Year (No Module D)</label> <sup id={"fnref:"+this.state.clicks+"7"}><a href={"#fn:"+this.state.clicks+"7"}  rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup} style={{minHeight:195}}>
                <h3>BIOGENIC CARBON</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked={this.state.biogenicCarbon === "yBio"} onChange={this.handleInputChange} />
                  <label htmlFor="yBio">With Biogenic Carbon</label> <sup id={"fnref:"+this.state.clicks+"8"}><a href={"#fn:"+this.state.clicks+"8"}  rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" checked={this.state.biogenicCarbon === "nBio"} onChange={this.handleInputChange} />
                  <label htmlFor="nBio">No Biogenic Carbon</label> <sup id={"fnref:"+this.state.clicks+"9"}><a href={"#fn:"+this.state.clicks+"9"}  rel="footnote"></a></sup>
                </div>
              </div>
            </div>

          </form>
          <div style={{ display: "inline-block", height: "100%" }} id="parentDiv">

            {this.state.flooring_materials.length > 0 &&
              <div className={styles.sidebar} id="sidebar123">
                <FlooringMaterialList
                  gwp={flooring_obj}
                  materials={this.state.flooring_materials}
                  names={this.state.flooring_names}
                  updateSelectedMaterials={this.updateSelectedFlooringMaterials.bind(this)}
                  initialSelectedMaterials={this.state.flooring_selectedMaterials}
                  metaData={FlooringLoadData.metaData}
                  currentSel={this.state.chartType}
                  matBreakdown={this.state.flooring_materialData1}
                  matBreakdown1={this.state.flooring_materialData3}
                  matBreakdown2={this.state.flooring_materialData5}
                  tenYGWP={this.state.flooring_gwpData1}
                  sixty1YGWP={this.state.flooring_gwpData3}
                  sixty2YGWP={this.state.flooring_gwpData5}
                />
              </div>
            }
            <h2>{chartTitle}</h2>
            {/* GLOBAL WARMING POTENTIAL */}
            <div className={styles.chartContainer}>
              {this.state.chartType === "GWP" && this.state.flooring_gwpData.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnlyFlooring}
                allMaterials={this.state.flooring_gwpData}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnlyFlooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnlyFlooring}
                allMaterials={this.state.flooring_allImpactsData}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnlyFlooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnlyFlooring}
                allMaterials={this.state.flooring_lcsData}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnlyFlooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnlyFlooring}
                allMaterials={this.state.flooring_materialData}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnlyFlooring}
                allMaterials={this.state.flooring_gwpData}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}




              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.flooring_gwpData1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly1Flooring}
                allMaterials={this.state.flooring_gwpData1}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly1Flooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly1Flooring}
                allMaterials={this.state.flooring_allImpactsData1}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly1Flooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly1Flooring}
                allMaterials={this.state.flooring_lcsData1}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly1Flooring.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly1Flooring}
                allMaterials={this.state.flooring_materialData1}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly1Flooring}
                allMaterials={this.state.flooring_gwpData1}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}





              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.flooring_gwpData2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly2Flooring}
                allMaterials={this.state.flooring_gwpData2}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly2Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly2Flooring}
                allMaterials={this.state.flooring_allImpactsData2}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly2Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly2Flooring}
                allMaterials={this.state.flooring_lcsData2}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly2Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly2Flooring}
                allMaterials={this.state.flooring_materialData2}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly2Flooring}
                allMaterials={this.state.flooring_gwpData2}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}





              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.flooring_gwpData3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly3Flooring}
                allMaterials={this.state.flooring_gwpData3}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly3Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly3Flooring}
                allMaterials={this.state.flooring_allImpactsData3}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly3Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly3Flooring}
                allMaterials={this.state.flooring_lcsData3}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly3Flooring.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly3Flooring}
                allMaterials={this.state.flooring_materialData3}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly3Flooring}
                allMaterials={this.state.flooring_gwpData3}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}






              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.flooring_gwpData4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly4Flooring}
                allMaterials={this.state.flooring_gwpData4}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly4Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly4Flooring}
                allMaterials={this.state.flooring_allImpactsData4}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly4Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly4Flooring}
                allMaterials={this.state.flooring_lcsData4}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly4Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly4Flooring}
                allMaterials={this.state.flooring_materialData4}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData4.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly4Flooring}
                allMaterials={this.state.flooring_gwpData4}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}







              {/* GLOBAL WARMING POTENTIAL */}

              {this.state.chartType === "GWP" && this.state.flooring_gwpData5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly5Flooring}
                allMaterials={this.state.flooring_gwpData5}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="material"
                currentChart={this.state.chartType}
              />}
              {/* ALL IMPACTS*/}

              {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly5Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={allImpactsDataSelectedMaterialsOnly5Flooring}
                allMaterials={this.state.flooring_allImpactsData5}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="Normalized % of Total"
                currentChart={this.state.chartType}
              />}
              {/* LIFE CYCLE STAGE */}

              {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly5Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={lcsDataSelectedMaterialsOnly5Flooring}
                allMaterials={this.state.flooring_lcsData5}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}
              {/* MATERIAL BREAKDOWN */}

              {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly5Flooring.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={materialDataSelectedMaterialsOnly5Flooring}
                allMaterials={this.state.flooring_materialData5}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                currentChart={this.state.chartType}
              />}

              {/* MATERIAL HEALTH */}
              {this.state.chartType === "MH" && this.state.flooring_gwpData5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <FlooringStackedBarChart
                selectedMaterials={gwpDataSelectedMaterialsOnly5Flooring}
                allMaterials={this.state.flooring_gwpData5}
                metaData={FlooringLoadData.metaData}
                barHeight={40}
                xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
                colorBy="health"
                currentChart={this.state.chartType}
              />}

              <div>


              </div>

            </div>
          </div>
          <div style={{ display: "inline-block", width: "100%" }}>
            <h1>FLOORING CALCULATOR</h1>
            <div className={styles.calc} style={{ minHeight: '60px', display: "block" }}>

              <div style={{ margin: "auto" }}>
                <input type="radio" id="ten" name={"gender"} value="1" onChange={this.radioChange.bind(this)} defaultChecked></input>
                <label for="ten"> Initial Carbon (only Module A) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty2" name={"gender"} value="3" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty2"> 60 Year (with Module D) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty1" name={"gender"} value="2" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty1"> 60 Year (no Module D) &nbsp;&nbsp;</label>



              </div><br></br>

              {this.state.rows.map((row, idx) => {
                return (
                  <Flooring_Row
                    key={idx}
                    value={row.value}
                    checked={row.checked}
                    name={idx + 1}
                    count={0}
                    tenY={this.state.flooring_gwpData1}
                    sixty1={this.state.flooring_gwpData3}
                    sixty2={this.state.flooring_gwpData5}
                    radio={this.state.currentRadio}
                    divStyle={divStyle}
                    onChange={(e) => this.updateValue(e, idx)}
                    onChecked={() => this.onChecked(idx)}
                  />
                )
              })
              }
              <br></br>

              <button onClick={this.addRow}>
                Add Option
                </button>
                  <button onClick={this.deleteRows}>
                    Delete Option
              </button>


              <br></br>


            </div>

            <div style={{ paddingTop: 0, top: 0, marginTop: 0 }}>
              <p style={{ display: "inline-block", fontFamily:"'freight-text-pro', serif" }}>
                Last updated April 2021<br></br>
              Credit: <i>Data analysis run using Tally version 2020.06.09.01 by KT Innovations, thinkstep, and Autodesk using industry standard EPDs unless otherwise noted </i><br></br>
              For questions or comments: <h5 style={{display:"inline-block"}}>tools@payette.com</h5>

              </p>
            </div>
          </div>
        

        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Other
      </TabPanel>
        <div className="footnotes" style={{visibility:"hidden", height:"0px"}}>
          <ol>
            <li className="footnote" id="fn:1">
              <p>Greenhouse gas emissions shown in equivalent units of carbon dioxide. Most impactful factor to reduce to meet climate change goals.</p>
            </li>
            <li className="footnote" id={"fn:2"}>
              <p>Weighted LCA normalized across all systems. Includes global warming potential, non-renewable energy demand, eutrophication, smog creation, acidification, and ozone depletion. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:3">
              <p>Results broken into life cycle stage as defined by standard EN 15978.</p>
            </li>
            <li className="footnote" id="fn:4">
              <p>Global Warming Potential broken down into parts of the assembly: exterior finish, finish support, thermal insulation, and other.</p>
            </li>
            <li className="footnote" id="fn:5">
              <p>Includes Cradle-to-Gate (A1-3) + Transport (A4).  Data for the time value of carbon and the 2030 carbon reduction goals. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:6">
              <p>Data included Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info. In some graphs this will be represented as a negative credit.</p>
            </li>
            <li className="footnote" id="fn:7">
              <p>Data does not include Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:8">
              <p>Takes into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents FSC or sustainable forestry. Sequestered carbon will show up as a negative credit when looking at biomass materials in the Material Breakdown chart.</p>
            </li>
            <li className="footnote" id="fn:9">
              <p>Does not take into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents typical forestry practices.</p>

            </li>
            <li className="footnote" id="fn:10">
              <p>Evaluates assemblies based on Payette's Material Health Policy. Read more about it <a href="https://www.payette.com/wp-content/uploads/2019/06/policy_and_letter.pdf" target="_blank">here</a>.</p>

            </li>
            <li className="footnote" id="fn:11">
              <p>Greenhouse gas emissions shown in equivalent units of carbon dioxide. Most impactful factor to reduce to meet climate change goals.</p>
            </li>
            <li className="footnote" id={"fn:12"}>
              <p>Weighted LCA normalized across all systems. Includes global warming potential, non-renewable energy demand, eutrophication, smog creation, acidification, and ozone depletion. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:13">
              <p>Results broken into life cycle stage as defined by standard EN 15978.</p>
            </li>
            <li className="footnote" id="fn:14">
              <p>Global Warming Potential broken down into parts of the assembly: exterior finish, finish support, thermal insulation, and other.</p>
            </li>
            <li className="footnote" id="fn:15">
              <p>Includes Cradle-to-Gate (A1-3) + Transport (A4).  Data for the time value of carbon and the 2030 carbon reduction goals. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:16">
              <p>Data included Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info. In some graphs this will be represented as a negative credit.</p>
            </li>
            <li className="footnote" id="fn:17">
              <p>Data does not include Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:18">
              <p>Takes into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents FSC or sustainable forestry. Sequestered carbon will show up as a negative credit when looking at biomass materials in the Material Breakdown chart.</p>
            </li>
            <li className="footnote" id="fn:19">
              <p>Does not take into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents typical forestry practices.</p>

            </li>
            

            
            


          </ol>
        </div>






      </div>
    );
  }
}
export default withSplashScreen(App);
// export default App;

