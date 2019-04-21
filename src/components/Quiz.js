import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quizDate: [],
      showInd: 0,
      correctAns: 0,
      selectedOption: "",
      showQuiz: false,
      startQuiz: true,
    }
    this.nextQuestion = this.nextQuestion.bind(this);
  }


  nextQuestion() {
    const { selectedOption, quizDate, showInd, correctAns } = this.state;

    if (showInd < 9) {
      if (selectedOption !== "") {
        if (selectedOption === quizDate[showInd].correct_answer) {
          this.setState({
            showInd: showInd + 1,
            correctAns: correctAns + 1,
            selectedOption: "",
          })
        } else {
          this.setState({
            showInd: showInd + 1,
            selectedOption: "",
          })
        }
      }
    } else {
      if (selectedOption !== "") {
        if (selectedOption === quizDate[showInd].correct_answer) {
          this.setState({
            correctAns: correctAns + 1,
            selectedOption: "",
          })
          this.props.handleResult(correctAns)
        } else {
          this.setState({
            selectedOption: "",
          })
          this.props.handleResult(correctAns)
        }
      }
    }
  }

  componentDidMount() {
    // const { correctAns, showQuiz} = this.state;
    fetch('https://opentdb.com/api.php?amount=10').then(results => results.json()).then(response => {
      this.setState({
        quizDate: response.results,
      })
    })
  }

  // static getDerivedStateFromProps(props, states) {
  //   console.log("props => ", props)
  //   console.log("states => ", states)
  //   if (states.showQuiz) {
  //     setTimeout(() => {
  //       console.log("Timer")
  //       props.handleResult(states.correctAns)
  //     }, 6000)
  //   }
  // }

  renderStartQuizDiv() {
    return (
      <div className="col-lg-5 col-md-6 col-11 bg-white mx-auto text-center border shadow px-2 py-4">
        <h1 className="h2 mb-4"><span className="h1 text-primary">&quot;</span>React Quiz App<span className="h1 text-primary">&quot;</span></h1>
        <button type="button" className="btn btn-primary shadow" onClick={() => this.setState({ showQuiz: true, startQuiz: false })}>Start Quiz</button>
      </div>
    )
  }

  render() {
    const { quizDate, showInd, showQuiz, startQuiz, } = this.state;
    let showQuizDate = quizDate.map((val, ind) => {
      let incorrectAns = val.incorrect_answers.map((val2, ind2) => {
        return (
          <div className="custom-control custom-radio" key={`option${ind2 + 1}`}>
            <input type="radio" onClick={() => this.setState({ selectedOption: val2 })} id={`option${ind2 + 1}`} name="optionRadio" className="custom-control-input" />
            <label className="custom-control-label" for={`option${ind2 + 1}`}>{val2}</label>
          </div>
        )
      })
      if (ind === showInd) {
        return (
          <div className="card shadow bg-white" key={ind}>
            <div className="card-body">
              <h5>Question: <span className="ml-2">{ind + 1}</span></h5>
              <h4 className="card-title">{val.question}</h4>
              <form>
                <div className="custom-control custom-radio" key='option0'>
                  <input type="radio" onClick={() => this.setState({ selectedOption: val.correct_answer })} id="option0" name="optionRadio" className="custom-control-input" />
                  <label className="custom-control-label" for="option0">{val.correct_answer}</label>
                </div>
                {incorrectAns}
              </form>
              <div className="mt-2">
                <button type="button" className="btn btn-primary float-right shadow" onClick={this.nextQuestion}>Next Question</button>
              </div>
            </div>
          </div>
        )
      }
    })
    return (
      <div style={{ height: '100vh' }} className="container d-flex justify-content-center align-items-center">
        <div className="container p-0">
          {showQuiz && showQuizDate}
          {startQuiz && this.renderStartQuizDiv()}
        </div>
      </div>
    );
  }
}

export default Quiz;