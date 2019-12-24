import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    return (
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div

                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </Aux>
    )
}

export default Modal;

// shouldComponentUpdate ( nextProps, nextState ) {
//     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
// }

// render () {



