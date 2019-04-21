import React, { Component } from 'react';
import Quiz from './components/Quiz'
import Result from './components/Result'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuiz: true,
      showResult: false,
    }
    this.handleResult = this.handleResult.bind(this)
    this.handleRestartQuiz = this.handleRestartQuiz.bind(this)
  }

  handleResult(correctAns) {
    this.setState({
      correctAns: correctAns,
      showQuiz: false,
      showResult: true,
    })
  }

  handleRestartQuiz(){
    this.setState({
      showQuiz: true,
      showResult: false,
    })
  }

  render() {
    const { correctAns, showQuiz, showResult, restart } = this.state;
    return (
      <div style={{ height: '100vh'}} className="container d-flex justify-content-center align-items-center">
        {showQuiz && <Quiz handleResult={this.handleResult} restart={restart} />}
        {showResult && <Result correctAns={correctAns} handleRestartQuiz={this.handleRestartQuiz} />}
      </div>
    );
  }
}

export default App;
