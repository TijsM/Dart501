import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxilery/Auxilery";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";

const Game = props => {
  let [totalThrowScore, settotalThrowScore] = useState(0);
  let [throwScores, setThrowScores] = useState([0, 0, 0]);
  let [throwCount, setThrowCount] = useState(0);

  let [scoreBoard, setScoreBoard] = useState([]);
  let [playerCount, setPlayerCount] = useState(0);

  let [showModal, setShowModal] = useState(false);
  let [winner, setWinner] = useState();
  let [isBurned, setIsBurned] = useState(false);

  let [showDemo, setShowDemo] = useState(false);

  let [shouldRedirect, setShouldRedirect] = useState(false);

  let [lastThrowDouble, setlastThrowDouble] = useState(false);

  let names = localStorage.getItem("names");
  names = names.split(",");

  useEffect(() => {
    let _scoreBoard = [];
    names.forEach(el => {
      _scoreBoard.push({
        name: el,
        score: localStorage.getItem("startScore")
      });
    });
    setScoreBoard(_scoreBoard);
  }, []);

  useEffect(() => {
    var centre20 = document.getElementById("centre");
    if (centre20) {
      // lastMessage.scrollTop = lastMessage.scrollHeight;
      centre20.scrollIntoView();

      centre20.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center"
      });
    }
  }, []);

  let scoreBoardList = null;
  scoreBoardList = scoreBoard.map(el => {
    return (
      <div className="playerScore" key={el.name + el.score + Math.random()}>
        <span>{el.name}</span>
        <span>{el.score}</span>
      </div>
    );
  });

  let modal = (
    <Popup modal open={showModal}>
      <Aux>
        <h1>Congrats {winner}!</h1>
        <div className="modalScoreBoard">{scoreBoardList}</div>
        <div className="modalButtons">
          <button className="buttonConfirm" onClick={() => startNewGame()}>
            restart game
          </button>
          <button className="buttonConfirm" onClick={() => resetGame()}>
            home
          </button>
        </div>
      </Aux>
    </Popup>
  );

  let burnedModal = (
    <Popup
      modal
      open={isBurned}
      closeOnDocumentClick={false}
      className="burned"
    >
      <Aux>
        <h1>Burned! </h1>
        <button className="buttonConfirm" onClick={() => setIsBurned(false)}>
          continue
        </button>
      </Aux>
    </Popup>
  );

  let demo = (
    <Popup modal open={showDemo} closeOnDocumentClick={false} className="demo">
      <Aux>
        <h1>how to use: </h1>
        <img
          src="demo.gif"
          alt="gif that gives a demo for the application"
        ></img>
        <button className="buttonConfirm" onClick={() => setShowDemo(false)}>
          start the game
        </button>
      </Aux>
    </Popup>
  );

  const setOneThrow = (throwValue, isDouble = false) => {
    setlastThrowDouble(isDouble);
    window.navigator.vibrate(35);

    if (throwCount <= 2) {
      const oldScore = totalThrowScore;
      const newScore = oldScore + throwValue;
      settotalThrowScore(newScore);

      const oldScores = throwScores;
      const newScores = oldScores;
      newScores[throwCount] = throwValue;
      setThrowScores(newScores);

      const oldThrowCount = throwCount;
      const newThrowCount = oldThrowCount + 1;
      setThrowCount(newThrowCount);
    }
  };

  const confirmScore = () => {
    const newScoreBoard = [...scoreBoard];
    console.log(newScoreBoard);
    window.navigator.vibrate(300);

    var centre20 = document.getElementById("centre");
    if (centre20) {
      // lastMessage.scrollTop = lastMessage.scrollHeight;
      centre20.scrollIntoView();

      centre20.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center"
      });
    }

    if (lastThrowDouble) {
    }
    if (newScoreBoard[playerCount].score - totalThrowScore < 0) {
      moveToNextPlayer();

      moveToNextPlayer();
      emptyFields();

      setIsBurned(true);
    } else if (newScoreBoard[playerCount].score - totalThrowScore === 0) {
      if (lastThrowDouble) {
        newScoreBoard[playerCount].score =
          newScoreBoard[playerCount].score - totalThrowScore;
        setWinner(scoreBoard[playerCount].name);
        setShowModal(true);
        moveToNextPlayer();
        emptyFields();
      } else {
        moveToNextPlayer();

        moveToNextPlayer();
        emptyFields();

        setIsBurned(true);
      }
    } else {
      newScoreBoard[playerCount].score =
        newScoreBoard[playerCount].score - totalThrowScore;
      moveToNextPlayer();
      emptyFields();
    }
  };

  const moveToNextPlayer = () => {
    const oldPlayerCount = playerCount;

    if (names.length - 1 === oldPlayerCount) {
      setPlayerCount(0);
    } else {
      setPlayerCount(oldPlayerCount + 1);
    }
  };

  const emptyFields = () => {
    settotalThrowScore(0);
    setThrowScores([0, 0, 0]);
    setThrowCount(0);
  };

  const resetScoreBoard = () => {
    let newScoreboard = [...scoreBoard];
    newScoreboard = newScoreboard.map(el => {
      return {
        name: el.name,
        score: 501
      };
    });
    setScoreBoard(newScoreboard);
  };

  const redo = () => {
    if (throwCount !== 0) {
      const oldThrowCount = throwCount;
      const newThrowCount = oldThrowCount - 1;
      setThrowCount(newThrowCount);

      const lastThrowScore = throwScores[throwCount - 1];
      const oldScore = totalThrowScore;
      const newScore = oldScore - lastThrowScore;
      settotalThrowScore(newScore);

      let newScores = throwScores;
      newScores[throwCount - 1] = 0;
      setThrowScores(newScores);
    }
  };

  const startNewGame = () => {
    resetScoreBoard();
    setShowModal(false);
  };

  const resetGame = () => {
    setShouldRedirect(true);
  };

  let redirect = null;
  if (shouldRedirect) {
    redirect = <Redirect to={`/`} />;
  }

  const boardNumbers = [
    3,
    19,
    7,
    16,
    8,
    11,
    14,
    9,
    12,
    5,
    20,
    1,
    18,
    4,
    13,
    6,
    10,
    15,
    2,
    17,
    3
  ];
  let evenIndex = false;
  let bottomInputs = null;
  bottomInputs = boardNumbers.map(el => {
    if (evenIndex) {
      evenIndex = !evenIndex;
      return (
        <div
          id={el === 20 ? "centre" : null}
          className="inputContainer"
          key={el * Math.random()}
        >
          <div
            className={["inputNumber", el === 20 ? "center20" : null].join(" ")}
          >
            {el}
          </div>
          <div
            className="inputDouble bgGreen"
            onClick={() => setOneThrow(el * 2, true)}
          ></div>
          <div
            className="inputRegularTop bgLight"
            onClick={() => setOneThrow(el)}
          ></div>
          <div
            className="inputTriple bgGreen"
            onClick={() => setOneThrow(el * 3)}
          ></div>
          <div
            className="inputRegularBottom bgLight"
            onClick={() => setOneThrow(el * 3)}
          ></div>
        </div>
      );
    } else {
      evenIndex = !evenIndex;
      return (
        <div
          id={el === 20 ? "centre" : null}
          className="inputContainer"
          key={el * Math.random()}
        >
          <div
            className={["inputNumber", el === 20 ? "center20" : null].join(" ")}
          >
            {el}
          </div>
          <div
            className="inputDouble bgRed"
            onClick={() => setOneThrow(el * 2, true)}
          ></div>
          <div
            className="inputRegularTop bgDark"
            onClick={() => setOneThrow(el)}
          ></div>
          <div
            className="inputTriple bgRed"
            onClick={() => setOneThrow(el * 3)}
          ></div>
          <div
            className="inputRegularBottom bgDark"
            onClick={() => setOneThrow(el * 2)}
          ></div>
        </div>
      );
    }
  });

  return (
    <Aux>
      <section id="scoreBoard" className="neomorphism">
        {scoreBoardList}
      </section>
      <section id="playingPlayer">playing: {names[playerCount]}</section>
      <section id="currentScore">
        <div
          className="button primaryButton neomorphism "
          onClick={() => redo()}
        >
          redo
        </div>
        <div id="pendingScore">
          {totalThrowScore}
          <div>
            to go:
            {scoreBoard[playerCount]
              ? scoreBoard[playerCount].score - totalThrowScore
              : console.log("loading")}
          </div>
        </div>
        <div
          className="button primaryButton neomorphism"
          onClick={() => confirmScore()}
        >
          confirm
        </div>
      </section>

      <section id="input">
        <article className="topInput">
          <div
            className="bulsEye neomorphism"
            onClick={() => setOneThrow(50)}
          ></div>
          <div className="throws">
            <div>
              {throwScores[0] === 0 ? (
                <div className="arrowContainer">
                  <div className="arrow arrow1"></div>
                  <div className="arrow arrow2"></div>
                </div>
              ) : (
                throwScores[0]
              )}
            </div>
            <div>
              {throwScores[1] === 0 ? (
                <div className="arrowContainer">
                  <div className="arrow arrow1"></div>
                  <div className="arrow arrow2"></div>
                </div>
              ) : (
                throwScores[1]
              )}
            </div>
            {throwScores[2] === 0 ? (
              <div className="arrowContainer">
                <div className="arrow arrow1"></div>
                <div className="arrow arrow2"></div>
              </div>
            ) : (
              throwScores[2]
            )}
          </div>
          <div
            className="bigBulsEye neomorphism"
            onClick={() => setOneThrow(25)}
          ></div>
        </article>
        <article id="bottomInput" className="neomorphism">
          {bottomInputs}
        </article>
      </section>
      {demo}
      {modal}
      {burnedModal}
      {redirect}
    </Aux>
  );
};

export default Game;
