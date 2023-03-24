import React from 'react';

// Component for Splash Screen
class SplashScreen extends React.Component {
  render() {
    const style = {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      position: 'fixed'
    };

    return (
      <img src={'IMAGE-URL'} style={style} />
    );
  }
}

class MainComponent extends React.Component {
  constructor(props) {
    this.state = {
      renderSplashscreen: true
    };
  }

  apiCallback(data) {
    // After getting the API response from server
    this.setState({ renderSplashscreen: false });
  }

  render() {
    let view;

    if (this.state.renderSplashscreen)
      return <SplashScreen />;
    else
      return <OtherComponent />
  }
}