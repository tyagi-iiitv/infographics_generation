import React from 'react';
import styles from './Canvas.module.scss';

/*
Canvas Class
Area where elements would be added
*/
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
