import React, { Component } from "react";
import SignUp from "./componets/Signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SignUp />
        </header>
      </div>
    );
  }
}

export default App;
