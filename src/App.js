<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import React, { Component } from 'react';  
import './App.css';
let recipient = "Orlando";

class App extends Component {

  constructor(props) {
    super(props);

    //recipient = recipient + "ly people"

    alert(`Hello ${recipient}`);
    console.log(`Hello ${recipient}`);
  }

  render() {
    return <h1>Hello {recipient}!</h1>;
  }
}

export default App;
