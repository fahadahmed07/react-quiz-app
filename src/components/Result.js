import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            correctAns: 0,
            percentage: 0,
            totalTime: 0,
        }
        this.restartQuiz = this.restartQuiz.bind(this)
    }
    componentDidMount(){
        const correctAns = this.props.correctAns
        const totalQues = 10
        const percentage = (correctAns/totalQues) * 100
        const totalTime = Math.floor(this.props.endTime - this.props.startTime)
        this.setState({
            percentage: percentage,
            correctAns: correctAns,
            totalTime: totalTime,
        })
    }


    restartQuiz(){
        this.props.handleRestartQuiz()
    }

    render() {
        const {correctAns, percentage, totalTime} = this.state;
        return (
            <div className="container text-center ">
            <div className="col-lg-6 bg-white shadow border mx-auto py-4">
                <p className="h2">Correct Answers: <span>{correctAns}</span> </p>
                <p className="h2">Percentage: <span>{percentage}%</span></p>
                <p className="h2">Total Time Taken: <span>{(totalTime / 60000).toFixed(2)} min</span></p>
                <button type="button" className="btn btn-primary shadow mt-2 " onClick={this.restartQuiz}>Restart Quiz</button>
            </div>
            </div>
        );
    }
}

export default Result;
