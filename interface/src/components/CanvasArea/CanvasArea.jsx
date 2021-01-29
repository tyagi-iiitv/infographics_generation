import React from 'react';
import styles from './CanvasArea.module.scss';

/*
CanvasArea Class
Area where elements would be added
*/
class CanvasArea extends React.Component {
    render() {
        return (
            <div className={styles.canvas} id="canvas">
                {this.props.children}
            </div>
        );
    }
}

export default CanvasArea;
