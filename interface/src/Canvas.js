import React from 'react';
import styles from './Canvas.module.scss';

class Canvas extends React.Component {
    render() {
        return (
            <div
                className={styles.canvas}
                id="canvas"
            >
                {this.props.children}
            </div>
        )
    }
}

export default Canvas;
