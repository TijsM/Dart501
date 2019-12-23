import React, { useState } from "react";
import Aux from '../../hoc/Auxilery/Auxilery'
import { Redirect } from "react-router-dom";

const InsertNames = props => {

    let [shouldRedirect, setShouldRedirect] = useState(false);

    let inputs = new Array(parseInt(props.match.params.amount, 10))
    inputs.fill(null)

    let jsxInput = null;
    let counter = 0;
    jsxInput = inputs.map(el => {
        counter++;
        return <input
            type="input"
            key={counter}
            placeholder={`player${counter}`}
            name={`name${counter}`}
        />
    })

    const submitForm = event => {
        console.log('clicked')
        event.preventDefault();

        let counter = 0;

        let names = [];
        inputs.forEach(() => {
            counter++;
            names.push(document.getElementById('namesForm')[`name${counter}`].value)
        })
        
        localStorage.setItem("names", names);

        setShouldRedirect(true); 
    }


    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to={`/game`}/>
    }


    return (
        <Aux>
            <h1>
                What are your beatiful names
          </h1>
            <form id='namesForm' className='nameContainer'>
                {jsxInput}

                <button className='buttonConfirm' onClick={event => submitForm(event)}>Confirm</button>
            </form>

            {redirect}
        </Aux>


    )
}

export default InsertNames;