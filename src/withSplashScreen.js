import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Pricing from './Pricing'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


// import auth0Client from '../Auth';
import './css/splash-screen.css';

import introJs from 'intro.js';
import './css/introjs copy2.css';
//import './css/introjs-payette.css';
import './css/introjs-modern copy.css';
// $.bigfoot();

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tier0 = [
  {
    title: 'WELCOME',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Want A Tour?' }} />,
    price: '0',
    img: "./img/QuestionMark1.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'Start Introduction' }} />,
    buttonVariant: 'text',
    item: 0,
    // disabled: true,
    id: 'startTour!'
  },
];



const tiers = [
  {
    title: 'ENVELOPES',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Exterior Assemblies' }} />,
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    img: "./img/MV_Axon2.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'View Envelopes' }} />,
    buttonVariant: 'contained',
    item: 0
  },
  {
    title: 'FLOORING',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Flooring Assemblies' }} />,
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    img: "./img/FL_Axon-2-1.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'View Floorings' }} />,
    buttonVariant: 'contained',
    item: 1
  },
  {
    title: 'CEILINGS',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Ceiling Assemblies' }} />,
    price: '20',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    img: "./img/ceilingslandingpageaxon2.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'View Ceilings' }} />,
    buttonVariant: 'contained',
    item: 2
  },
    {
    title: 'PARTITIONS',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Partition Assemblies' }} />,
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    img: "./img/MetalStuds_Axon_MS01_16_MinWool_MFB2.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'View Partitions' }} />,
    buttonVariant: 'contained',
    item: 3
  },
  {
    title: 'WALLS',
    subheader: <div dangerouslySetInnerHTML={{ __html: 'Wall Finish Assemblies' }} />,
    price: '40',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    img: "./img/Misc_Axon_M01_MetalVeneer.png",
    buttonText: <div dangerouslySetInnerHTML={{ __html: 'View Walls' }} />,
    buttonVariant: 'contained',
    item: 4
  },

];



let loading1 = true;




function withSplashScreen(WrappedComponent) {

  return class extends Component {



    constructor(props) {
      super(props);
      this.state = {
        loading: loading1,
        currentItem: 0
      };
    }

    async componentDidMount() {

      let s = new URLSearchParams(window.location.search)


      let type = s.get("type")



      if (type == 0 || type == 1 || type == 2 || type == 3 || type == 4) { //envelope
        this.setState({ loading: false, currentItem: type });
        if (type == 0) {
          this.setState({
            selectedMaterials: [
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
          })
        }
        if (type == 3) {
          this.setState({
            selectedMaterials: [
              "gButtGlazed",
              "gHollowMetalFrame",
              "gWoodFrame",
              "cFurredOutMFB",
              "cFurredOutEcosmart",
              "cPaintedBlock",
              "cJandris",
              "cFurredOutMDF",
              "ms16MinWoolMFB",
              "msEmb16MinWoolMFB",
              "ms24MinWoolMFB",
              "msCut24MinWoolMFB",
              "ms16MinWoolEcosmart",
              "msEmb24MinWoolMFB",
              "ms16GlassWoolMFB",
              "ms16MFB",
              "ms16CelluloselMFB",
              "MSIndustryBest",
              "ms16MinWoolMDF",
              "msReimagined",
              "ws24MinWoolMFB",
              "ws16MinWoolMFB",
              "ws16MinWoolEcosmart",
              "ws16GlassWoolMFB",
              "ws16MFB",
              "ws16CelluloseMFB",
              "wsIndustryBest",
              "ws16MinWoolMDF",
              "wsReimagined"
            ]
          })
        }
      }


    }



    LoadingMessage() {
      return (       
        

        <div className="splash-screen" >


          {/* <Button href="#" color="primary" variant="outlined">
                Login
              </Button> */}
          <Container component="main" data-step="1" data-intro="Select Assembly" disableInteraction={true} pointerEvents="none" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Grid container spacing={5} alignItems="flex-end" justifyContent="center" >

              {tier0.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} sm={6} md={4} >
                  <div style={{ maxWidth: '280px', margin: 'auto' }}> 
                    <Card style={{  minHeight: '100%', maxHeight: '100%' }}>
                      <CardHeader
                        title={tier.title}
                        subheader={
                          <div style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '3em', 
                            lineHeight: '1.5em', 
                          }}>
                            {tier.subheader}
                          </div>
                        }
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                      />
                      {/* <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                        <div >
                          <IconButton aria-label={tier.id} onClick={() => {
                            introJs().setOption('doneLabel', 'Next page').oncomplete(async function() {window.location.href = 'index.html?type=0';}).start(document.getElementById('startTour!'))
                            sessionStorage.IntroKey=1
                          }}>
                            <img src={tier.img} alt="Start Intro"                             
                            style={{ 
                                height: '100%', 
                                maxWidth: '100%', 
                                objectFit: 'contain',
                                position: 'relative', 
                                margin: "0 auto", 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                            }} 
                          />
                          </IconButton>
                        </div>
                      </CardContent> */}
                      <CardContent>
                        <div>
                          <Typography variant="h6" color="textSecondary">                    
                            {/* For future, intent: images become links: <a href="#">*/}
                              <img src={tier.img} 
                              style={{ 
                                height: '100%', 
                                maxWidth: '100%', 
                                objectFit: 'contain',
                                position: 'relative', 
                                margin: "0 auto", 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                              }} 
                          ></img>
                        </Typography> 
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.buttonVariant}
                          disabled={tier.disabled}
                          color="secondary"
                          onClick={() => {
                            introJs().setOption('doneLabel', 'Next page').oncomplete(async function() {window.location.href = 'index.html?type=0';}).start(document.getElementById('startTour!'))
                            //localStorage.setItem(IntroKey,"1");
                            sessionStorage.IntroKey=1
                            // this.setState({ loading: false, currentItem: tier.item, selectedMaterials: this.state.selectedMaterials });
                            // let urlVar = new URLSearchParams()
                            // urlVar.set("type", tier.item)                        
                            // window.history.replaceState({}, '', "?" + urlVar.toString())
                          }}
                          >

                          {tier.buttonText}
                        </Button>                    
                      </CardActions>
                    </Card>
                  </div>  
                </Grid>
              ))}

              
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} sm={6} md={4} >
                  <div style={{ maxWidth: '280px', margin: 'auto' }}> 
                    <Card style={{  minHeight: '100%', maxHeight: '100%' }}>
                      <CardHeader
                        title={tier.title}
                        subheader={
                          <div style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            height: '3em', 
                            lineHeight: '1.5em', 
                          }}>
                            {tier.subheader}
                          </div>
                        }
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                      // action={tier.title === 'Pro' ? <StarIcon /> : null}
                      // className={classes.cardHeader}
                      />
                      <CardContent>
                        <div>
                          <Typography variant="h6" color="textSecondary">                    
                            {/* For future, intent: images become links: <a href="#">*/}
                              <img src={tier.img} 
                              style={{ 
                                height: '100%', 
                                maxWidth: '100%', 
                                objectFit: 'contain',
                                position: 'relative', 
                                margin: "0 auto", 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                              }} 
                          ></img>
                        </Typography> 
                        </div>
                      </CardContent>
                      <CardActions>
                        <Button fullWidth variant={tier.buttonVariant}
                          disabled={tier.disabled}
                          color="secondary"
                          onClick={() => {

                            //introJs().setOption('doneLabel', 'Next page').oncomplete(function() {window.location.href = 'index.html?multipage=true';}).start(document.getElementById('startTour!'))
                            this.setState({ loading: false, currentItem: tier.item, selectedMaterials: this.state.selectedMaterials });
                            let urlVar = new URLSearchParams()
                            urlVar.set("type", tier.item)
                            sessionStorage.IntroKey=2                        
                            // urlVar.set("system", this.state.systemString)
                            // console.log(this.state.selectedMaterials)
                            // console.log(s.get("system"))
                            window.history.replaceState({}, '', "?" + urlVar.toString())
                          }}
                          >

                          {tier.buttonText}
                        </Button>                    
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              ))}

              
            </Grid>
            <br></br><br></br>
          </Container>
          {/* <Pricing loading={loading1}></Pricing> */}
          {/* Wait a moment while we load your app. */}
          {/* <div className="loading-dot">.</div> */}
          

          <br></br><br></br><br></br><br></br>
        </div>
      );
    }

    render() {

      //else if(type == 1){
      //   this.setState( //flooring
      //     {value: 1}
      //   )
      // }

      // while checking user session, show "loading" message
      if (!loading1) {
        this.setState({
          loading: false,
        });
        // this.props.loading = 1
      }

      if (this.state.loading) return this.LoadingMessage();

      // otherwise, show the desired route
      console.log(this.state)
      return <WrappedComponent item={this.state.currentItem} {...this.state} />;
    }


  };



}

export default withSplashScreen;