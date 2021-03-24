import React from 'react';
import { CanvasArea, TextInput, Gallery } from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';

let urls = [
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
];

class App extends React.Component {
    render() {
        return (
            <Tabs defaultIndex={0}>
                <TabList>
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
                </TabList>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
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
                </TabPanel>
                <TabPanel>
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
                </TabPanel>
            </Tabs>
        );
    }
}

export default App;
