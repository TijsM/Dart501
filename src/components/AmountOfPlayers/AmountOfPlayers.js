import React, { useState } from 'react';
import Aux from '../../hoc/Auxilery/Auxilery.js'
import { Redirect } from "react-router-dom";


const AmountOfPlayers = props => {

    let [shouldRedirect, setShouldRedirect] = useState(false);
    let [amount, setAmount] = useState(0)

    const selectAmountOfPlayers = (amount) => {
        setAmount(amount)
        setShouldRedirect(true);
    }

    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to={`insertNames/${amount}`} />
    }

    return (
        <Aux>
            <h1>
                Hi, let's play darts!
            </h1>
            <h2>
                With how many players are you?
            </h2>
            <div className="playerPicker">
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(1)}>1</div>
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(2)}>2</div>
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(3)}>3</div>
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(4)}>4</div>
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(5)}>5</div>
                <div className="neomorphism" onClick={() => selectAmountOfPlayers(6)}>6</div>
            </div>

            {redirect}
        </Aux>
    );
}

export default AmountOfPlayers;