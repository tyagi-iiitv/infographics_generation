import React from 'react';
import { CanvasArea, TextInput, Gallery } from './components';
import styles from './App.module.scss';
import { Tabs, Tab, Panel } from '@bumaga/tabs';

let urls = [
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
];

class App extends React.Component {
    render() {
        return (
            <Tabs>
                <div>
                    <Tab>
                        <button>Draw</button>
                    </Tab>
                    <Tab>
                        <button>Recommend Layouts</button>
                    </Tab>
                    <Tab>
                        <button>Recommend VGs</button>
                    </Tab>
                    <Tab>
                        <button>Explore Connections</button>
                    </Tab>
                </div>
                <Panel>
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
                </Panel>
                <Panel>
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.rightContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Panel>
                <Panel>
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.rightContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Panel>
                <Panel>
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.rightContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Panel>
            </Tabs>
        );
    }
}

export default App;
