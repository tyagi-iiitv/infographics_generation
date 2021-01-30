import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './CanvasArea.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faEraser,
    faTrash,
    faUpload,
    faExpand,
} from '@fortawesome/free-solid-svg-icons';

/*
CanvasArea Class
Area where elements would be added
*/
class CanvasArea extends React.Component {
    render() {
        return (
            <div className={styles.canvasAreaContainer}>
                <div className={styles.canvasArea} id="canvas">
                    {this.props.children}
                </div>
                <div className={styles.canvasToolbox}>
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Resolution change button group"
                    >
                        <Tooltip title="Change resolution to 1:1">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                            >
                                <div className={styles.dimButton}>
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div
                                        style={{
                                            'font-size': 'calc(5px + 0.75vmin)',
                                        }}
                                    >
                                        1:1
                                    </div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 3:4">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                            >
                                <div className={styles.dimButton}>
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div
                                        style={{
                                            'font-size': 'calc(5px + 0.75vmin)',
                                        }}
                                    >
                                        3:4
                                    </div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 4:3">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                            >
                                <div className={styles.dimButton}>
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div
                                        style={{
                                            'font-size': 'calc(5px + 0.75vmin)',
                                        }}
                                    >
                                        4:3
                                    </div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 16:9">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                            >
                                <div className={styles.dimButton}>
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div
                                        style={{
                                            'font-size': 'calc(5px + 0.75vmin)',
                                        }}
                                    >
                                        16:9
                                    </div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 9:16">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                            >
                                <div className={styles.dimButton}>
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div
                                        style={{
                                            'font-size': 'calc(5px + 0.75vmin)',
                                        }}
                                    >
                                        9:16
                                    </div>
                                </div>
                            </Button>
                        </Tooltip>
                    </ButtonGroup>

                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Resolution change button group"
                    >
                        <Tooltip title="Upload Image">
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                className={styles.toolButton}
                            >
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    aria-label="Upload Image"
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Draw">
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                className={styles.toolButton}
                            >
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    aria-label="Draw"
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Erase">
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                className={styles.toolButton}
                            >
                                <FontAwesomeIcon
                                    icon={faEraser}
                                    aria-label="Erase"
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Clear Draw Area">
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                className={styles.toolButton}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    aria-label="Clear Draw Area"
                                />
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default CanvasArea;

/*
Resolutions:
4:3 - 640x480
16:9 - 640 x 360
1:1 - 640x640
*/
