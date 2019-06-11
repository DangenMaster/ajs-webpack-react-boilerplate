import React from "react";
import styles from "./main.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.climb = this.climb.bind(this);
  }

  climb() {
    this.setState({
      count: this.state.count + 1
    });
  }
  
  render() {
    return(
      <div 
        className={styles.counter}
        onClick={this.climb}
      >
        <h1>Count: {this.state.count}</h1>
      </div>
    )
  }
}

export default Counter;