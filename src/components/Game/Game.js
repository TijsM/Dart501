import React, { useState } from 'react';
import Aux from '../../hoc/Auxilery/Auxilery';

const Game = props => {
    const boardNumbers = [3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3]
    let evenIndex = false;
    let bottomInputs = null
    bottomInputs = boardNumbers.map(el => {
        console.log(evenIndex)
        if (evenIndex) {
            evenIndex = !evenIndex;
            return (
                <div className="inputContainer" key={el * Math.random()}>
                    <div className='inputNumber'>{el}</div>
                    <div className='inputTriple bgGreen'></div>
                    <div className='inputRegularTop bgLight'></div>
                    <div className='inputDouble bgGreen'></div>
                    <div className='inputRegularBottom bgLight'></div>
                </div>
            )
        }
        else {
            evenIndex = !evenIndex;
            return (
                <div className="inputContainer" key={el * Math.random()}>
                    <div className='inputNumber'>{el}</div>
                    <div className='inputTriple bgRed'></div>
                    <div className='inputRegularTop bgDark'></div>
                    <div className='inputDouble bgRed'></div>
                    <div className='inputRegularBottom bgDark'></div>
                </div>
            )
        }
    }
    )

    return (
        <Aux>
            <section id="scoreBoard">
                <div className="playerScore">
                    <span>Player1</span>
                    <span>501</span>
                </div>
                <hr />
                <div className="playerScore">
                    <span>Player2</span>
                    <span>501</span>
                </div>
                <hr />
                <div className="playerScore">
                    <span>Player3</span>
                    <span>501</span>
                </div>
                <hr />
                <div className="playerScore">
                    <span>Player4</span>
                    <span>501</span>
                </div>
                <hr />
                <div className="playerScore">
                    <span>Player5</span>
                    <span>501</span>
                </div>
            </section>
            <section id='currentScore'>
                <div className="button secondaryButton">
                    redo
                </div>
                <div id="pendingScore">
                    87
                </div>
                <div className="button primaryButton">
                    confirm
                </div>

            </section>
            <section id="input">
                <article className="topInput">
                    <div className="bulsEye">
                    </div>
                    <div className="throws">
                        <div>
                            60
                        </div>
                        <div>
                            17
                        </div>
                        <div className="arrowContainer">
                            <div className="arrow arrow1"></div>
                            <div className="arrow arrow2"></div>
                        </div>
                    </div>
                    <div className="bigBulsEye">
                    </div>
                </article>
                <article id="bottomInput">
                    {bottomInputs}
                </article>
            </section>
        </Aux>
    )
}


export default Game;