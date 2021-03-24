import React from 'react';
import { CanvasArea, TextInput, Gallery } from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPane } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let urls = [
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
];

class App extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="Draw" id="tabs">
                <Tab eventKey="Draw" title="Draw">
                    <div className={styles.AppBody}>
                        <div className={styles.leftContainer}>
                            <CanvasArea />
                        </div>
                        <div className={styles.rightContainer}>
                            <TextInput />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="VIF Recommendation" title="VIF Recommendation">
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="VG Recommendation" title="VG Recommendation">
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="Explore Connections" title="Explore Connections">
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export default App;
