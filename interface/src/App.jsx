import React from 'react';
import { CanvasArea, TextInput } from './components';
import styles from './App.module.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [], // Information about visual groups from the input
        };
        this.getInfoObjects = this.getInfoObjects.bind(this);
    }

    /*
    Add info object to state
    */
    getInfoObjects(info) {
        this.setState({ info: info });
    }

    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppBody}>
                    <div className={styles.leftContainer}>
                        <CanvasArea />
                    </div>
                    <div className={styles.rightContainer}>
                        <TextInput infoObjects={this.getInfoObjects} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
