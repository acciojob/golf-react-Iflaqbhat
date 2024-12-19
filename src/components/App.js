import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderBall: false, // Tracks whether to show the ball
      posi: 0, // Tracks the numeric position of the ball
      ballPosition: { left: "0px" }, // Tracks the ball's CSS left style
    };
    this.renderChoice = this.renderBallOrButton.bind(this);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this); // Ensure proper binding
  }

  // Button click handler to start the game
  buttonClickHandler() {
    this.setState({
      renderBall: true, // Render the ball
    });
  }

  // Method to decide what to render (button or ball)
  renderBallOrButton() {
    if (this.state.renderBall) {
      return <div className="ball" style={this.state.ballPosition}></div>;
    } else {
      return (
        <button className="start" onClick={this.buttonClickHandler}>
          Start
        </button>
      );
    }
  }

  // Keydown event handler
  handleKeydown(event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
      this.setState((prevState) => {
        const newPosi = prevState.posi + 5;
        return {
          posi: newPosi,
          ballPosition: { left: `${newPosi}px` }, // Update the left position
        };
      });
    }
  }

  // Bind the keydown event listener
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  // Clean up the event listener when the component unmounts
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  render() {
    return <div className="playground">{this.renderBallOrButton()}</div>;
  }
}

export default App;
