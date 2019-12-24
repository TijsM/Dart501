import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxilery/Auxilery';
import Popup from 'reactjs-popup'

const Game = props => {
    let [totalThrowScore, settotalThrowScore] = useState(0)
    let [throwScores, setThrowScores] = useState([0, 0, 0])
    let [throwCount, setThrowCount] = useState(0)

    let [scoreBoard, setScoreBoard] = useState([]);
    let [playerCount, setPlayerCount] = useState(0)

    let [showModal, setShowModal] = useState(false)
    let [winner, setWinner] = useState();
    let [finalScoreBoard, setFinalScoreBOard] = useState({})

    let names = localStorage.getItem('names');
    names = names.split(',')

    useEffect(() => {
        let _scoreBoard = [];
        names.forEach(el => {
            _scoreBoard.push({
                name: el,
                score: 100
            })
        })
        setScoreBoard(_scoreBoard)
    }, [])



    let scoreBoardList = null;
    scoreBoardList = scoreBoard.map(el => {
        return (
            <div className="playerScore" key={el.name + el.score + Math.random()}>
                <span>{el.name}</span>
                <span>{el.score}</span>
            </div>

        )
    })

    let modal = (
        <Popup
            modal
            open={showModal}
        >
            <Aux>
                <h1>Congrats {winner}!</h1>
                <div className='modalScoreBoard'>
                    {scoreBoardList}
                </div>
                <div className='modalButtons'>
                    <button className="buttonConfirm">
                        restart game
                    </button>
                    <button className="buttonConfirm">
                        home
                    </button>
                </div>
            </Aux>
        </Popup>
    )

    const setOneThrow = (throwValue) => {
        if (throwCount <= 2) {
            const oldScore = totalThrowScore;
            const newScore = oldScore + throwValue
            settotalThrowScore(newScore)

            const oldScores = throwScores;
            const newScores = oldScores;
            newScores[throwCount] = throwValue
            setThrowScores(newScores)

            const oldThrowCount = throwCount;
            const newThrowCount = oldThrowCount + 1;
            setThrowCount(newThrowCount)
        }
    }

    const confirmScore = () => {
        const newScoreBoard = [...scoreBoard];
        console.log(newScoreBoard)

        if (newScoreBoard[playerCount].score - totalThrowScore < 0) {
            moveToNextPlayer()

            moveToNextPlayer();
            emptyFields();

            alert('burned')
        }
        else if (newScoreBoard[playerCount].score - totalThrowScore === 0) {
            setWinner(scoreBoard[playerCount].name)
            setShowModal(true)
            moveToNextPlayer();
            emptyFields();
            resetScoreBoard();
            
        }
        else {
            newScoreBoard[playerCount].score = newScoreBoard[playerCount].score - totalThrowScore;
            moveToNextPlayer();
            emptyFields();
        }
    }

    const moveToNextPlayer = () => {
        const oldPlayerCount = playerCount;

        if (names.length - 1 === oldPlayerCount) {
            setPlayerCount(0)
        }
        else {
            setPlayerCount(oldPlayerCount + 1)
        }
    }

    const emptyFields = () => {
        settotalThrowScore(0);
        setThrowScores([0, 0, 0])
        setThrowCount(0)
    }

    const resetScoreBoard = () => {
        let newScoreboard = [...scoreBoard];
        newScoreboard = newScoreboard.map(el => {
            return ({
                name: el.name,
                score: 100
            })
        })

        console.log(newScoreboard)

        setScoreBoard(newScoreboard)
    }

    const redo = () => {
        const oldThrowCount = throwCount;
        const newThrowCount = oldThrowCount - 1;
        setThrowCount(newThrowCount)

        const lastThrowScore = throwScores[throwCount - 1]
        const oldScore = totalThrowScore;
        const newScore = oldScore - lastThrowScore
        settotalThrowScore(newScore)

        let newScores = throwScores;
        newScores[throwCount - 1] = 0;
        setThrowScores(newScores)
    }


    const boardNumbers = [3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3]
    let evenIndex = false;
    let bottomInputs = null
    bottomInputs = boardNumbers.map(el => {
        if (evenIndex) {
            evenIndex = !evenIndex;
            return (
                <div className='inputContainer' key={el * Math.random()}>
                    <div className={['inputNumber', el === 20 ? "center20" : null].join(' ')}>{el}</div>
                    <div className='inputTriple bgGreen' onClick={() => setOneThrow(el * 2)}></div>
                    <div className='inputRegularTop bgLight' onClick={() => setOneThrow(el)}></div>
                    <div className='inputDouble bgGreen' onClick={() => setOneThrow(el * 3)}></div>
                    <div className='inputRegularBottom bgLight' onClick={() => setOneThrow(el * 3)}></div>
                </div>
            )
        }
        else {
            evenIndex = !evenIndex;
            return (
                <div className='inputContainer' key={el * Math.random()}>
                    <div className={['inputNumber', el === 20 ? "center20" : null].join(' ')}>{el}</div>
                    <div className='inputTriple bgRed' onClick={() => setOneThrow(el * 2)} ></div>
                    <div className='inputRegularTop bgDark' onClick={() => setOneThrow(el)} ></div>
                    <div className='inputDouble bgRed' onClick={() => setOneThrow(el * 3)} ></div>
                    <div className='inputRegularBottom bgDark' onClick={() => setOneThrow(el * 2)} ></div>
                </div>
            )
        }
    }
    )

    return (
        <Aux>
            <section id="scoreBoard">
                {scoreBoardList}
            </section>
            <section id='currentScore'>
                <div className="button secondaryButton" onClick={() => redo()}>
                    redo
                </div>
                <div id="pendingScore">
                    {totalThrowScore}
                </div>
                <div className="button primaryButton" onClick={() => confirmScore()}>
                    confirm
                </div>
            </section>
            <section id="input">
                <article className="topInput" >
                    <div className="bulsEye" onClick={() => setOneThrow(50)}>
                    </div>
                    <div className="throws">
                        <div>
                            {throwScores[0] === 0 ?
                                <div className="arrowContainer">
                                    <div className="arrow arrow1"></div>
                                    <div className="arrow arrow2"></div>
                                </div>
                                :
                                throwScores[0]
                            }
                        </div>
                        <div>
                            {throwScores[1] === 0 ?
                                <div className="arrowContainer">
                                    <div className="arrow arrow1"></div>
                                    <div className="arrow arrow2"></div>
                                </div>
                                :
                                throwScores[1]
                            }
                        </div>
                        {throwScores[2] === 0 ?
                            <div className="arrowContainer">
                                <div className="arrow arrow1"></div>
                                <div className="arrow arrow2"></div>
                            </div>
                            :
                            throwScores[2]
                        }
                    </div>
                    <div className="bigBulsEye" onClick={() => setOneThrow(25)}>
                    </div>
                </article>
                <article id="bottomInput">
                    {bottomInputs}
                </article>
            </section>
            {modal}
        </Aux>
    )
}


export default Game;