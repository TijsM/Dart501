import React from 'react';


const backdrop = (props) => (
    props.show ? <div className='backDrop' onClick={props.clicked}></div> : null
);

export default backdrop;