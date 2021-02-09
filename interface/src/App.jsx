import React from 'react';
import { CanvasArea, TextInput } from './components';
import styles from './App.module.scss';

class App extends React.Component {
    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppBody}>
                    <div className={styles.leftContainer}>
                        <CanvasArea />
                    </div>
                    <div className={styles.rightContainer}>
                        <TextInput />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
