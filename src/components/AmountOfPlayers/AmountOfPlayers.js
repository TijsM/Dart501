import React from 'react';
import Aux from '../../hoc/Auxilery/Auxilery.js'

const AmountOfPlayers = props => {

    return (
        <Aux>
            <h1>
                Hi, let's play darts!
            </h1>
            <h2>
                With how many players are you?
            </h2>
            <div class="playerPicker">
                <div onClick="selectAmountOfPlayers(1)">1</div>
                <hr />
                <div onClick="selectAmountOfPlayers(2)">2</div>
                <hr />
                <div onClick="selectAmountOfPlayers(3)">3</div>
                <hr />
                <div onClick="selectAmountOfPlayers(4)">4</div>
                <hr />
                <div onClick="selectAmountOfPlayers(5)">5</div>
                <hr />
                <div onClick="selectAmountOfPlayers(6)">6</div>
            </div>
        </Aux>
    );

}

export default AmountOfPlayers;