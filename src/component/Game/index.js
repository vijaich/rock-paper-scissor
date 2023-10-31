import {Component} from 'react'
import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import Options from '../Options'

import './index.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newList: props.list,
      displayResult: false,
      option: '',
      randomId: '',
      score: 0,
      winDisplayText: '',
    }
  }

  selectedOption = id => {
    const {newList, score} = this.state
    const num = score
    const randomNum = Math.ceil(Math.random() * 3) - 1
    const userWin =
      (id === 'ROCK' && newList[randomNum].id === 'SCISSORS') ||
      (id === 'PAPER' && newList[randomNum].id === 'ROCK') ||
      (id === 'SCISSORS' && newList[randomNum].id === 'PAPER')
    if (userWin) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        winDisplayText: 'YOU WON',
      }))
    } else if (id === newList[randomNum].id) {
      this.setState({score: num, winDisplayText: 'IT IS DRAW'})
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        winDisplayText: 'YOU LOSE',
      }))
    }

    this.setState({
      option: id,
      displayResult: true,
      randomId: newList[randomNum].id,
    })
  }

  onPlayAgain = () => {
    this.setState({displayResult: false})
  }

  renderWinCard = () => {
    const {option, randomId, newList, winDisplayText} = this.state

    const userCard = newList.filter(each => each.id === option)
    const randomCard = newList.filter(each => each.id === randomId)

    return (
      <div className="win-loss-card-container">
        <div className="each-card-bg-container">
          <div className="each-card">
            <h1 className="text">You</h1>
            <img
              src={userCard[0].imageUrl}
              alt="your choice"
              className="win-card-img"
            />
          </div>
          <div className="each-card">
            <h1 className="text">Opponent</h1>
            <img
              src={randomCard[0].imageUrl}
              alt="opponent choice"
              className="win-card-img"
            />
          </div>
        </div>
        <div>
          <p>{winDisplayText}</p>
          <button
            type="button"
            onClick={this.onPlayAgain}
            className="play-again-btn"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {newList, displayResult, score} = this.state

    return (
      <div className="bg-container">
        <div className="score-bg-container">
          <h1 className="page-header">Rock Paper Scissors</h1>
          <div className="score-container">
            <p>Score</p>
            <p className="score">{score}</p>
          </div>
        </div>

        {displayResult ? (
          this.renderWinCard()
        ) : (
          <div className="user-options">
            {newList.map(each => (
              <Options
                key={each.id}
                optionDetails={each}
                selectedOption={this.selectedOption}
              />
            ))}
          </div>
        )}
        <Popup
          modal
          trigger={
            <button className="rules-btn" type="button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="rules-bg-container">
              <button
                type="button"
                className="close-icon-btn"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default Game
