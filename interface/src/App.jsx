import React from 'react';
import { CanvasArea, TextInput, Gallery } from './components';
import styles from './App.module.scss';

let urls = [
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
];

class App extends React.Component {
    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppBody}>
                    <div className={styles.leftContainer}>
                        <CanvasArea />
                    </div>
                    {/* <div className={styles.rightContainer}>
                        <TextInput />
                    </div> */}
                    <div className={styles.rightContainer}>
                        <Gallery imageUrls={urls} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
