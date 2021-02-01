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
    constructor(props) {
        super(props);
        this.state = {
            canvasRes: '4:3',
        };
        this.draw_canvas = React.createRef();
        this.clearCanvas = this.clearCanvas.bind(this);
        this.setCanvasRes = this.setCanvasRes.bind(this);
    }

    componentDidMount() {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        this.setCanvasRes(1280, 960);
        ctx.fillStyle = 'ghostwhite';
        ctx.lineWidth = 1;
    }

    setCanvasRes(width, height) {
        const canvas = this.draw_canvas.current;
        canvas.width = width;
        canvas.height = height;
    }

    clearCanvas = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'ghostwhite';
    };

    render() {
        return (
            <div className={styles.canvasAreaContainer}>
                <canvas
                    id="draw_canvas"
                    ref={this.draw_canvas}
                    width="0"
                    height="0"
                    style={{
                        margin: 'auto',
                        display: 'block',
                        'max-width': '95%',
                        'max-height': '89%',
                        'background-color': 'ghostwhite',
                    }}
                    className={styles.canvasArea}
                />
                <div className={styles.canvasToolbox}>
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Resolution change button group"
                    >
                        <Tooltip title="Change resolution to 4:3">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                                style={
                                    this.state.canvasRes === '4:3'
                                        ? { pointerEvents: 'none' }
                                        : {}
                                }
                                onClick={() => {
                                    this.setState({
                                        canvasRes: '4:3',
                                    });
                                    this.setCanvasRes(1280, 960);
                                }}
                                disabled={this.state.canvasRes === '4:3'}
                            >
                                <div
                                    className={styles.dimButton}
                                    style={{
                                        color:
                                            this.state.canvasRes === '4:3'
                                                ? 'white'
                                                : 'black',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div>4:3</div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 3:4">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                                style={
                                    this.state.canvasRes === '3:4'
                                        ? { pointerEvents: 'none' }
                                        : {}
                                }
                                onClick={() => {
                                    this.setState({
                                        canvasRes: '3:4',
                                    });
                                    this.setCanvasRes(960, 1280);
                                }}
                                disabled={this.state.canvasRes === '3:4'}
                            >
                                <div
                                    className={styles.dimButton}
                                    style={{
                                        color:
                                            this.state.canvasRes === '3:4'
                                                ? 'white'
                                                : 'black',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div>3:4</div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 1:1">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                                style={
                                    this.state.canvasRes === '1:1'
                                        ? { pointerEvents: 'none' }
                                        : {}
                                }
                                onClick={() => {
                                    this.setState({
                                        canvasRes: '1:1',
                                    });
                                    this.setCanvasRes(1280, 1280);
                                }}
                                disabled={this.state.canvasRes === '1:1'}
                            >
                                <div
                                    className={styles.dimButton}
                                    style={{
                                        color:
                                            this.state.canvasRes === '1:1'
                                                ? 'white'
                                                : 'black',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div>1:1</div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 16:9">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                                style={
                                    this.state.canvasRes === '16:9'
                                        ? { pointerEvents: 'none' }
                                        : {}
                                }
                                onClick={() => {
                                    this.setState({
                                        canvasRes: '16:9',
                                    });
                                    this.setCanvasRes(1280, 720);
                                }}
                                disabled={this.state.canvasRes === '16:9'}
                            >
                                <div
                                    className={styles.dimButton}
                                    style={{
                                        color:
                                            this.state.canvasRes === '16:9'
                                                ? 'white'
                                                : 'black',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div>16:9</div>
                                </div>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Change resolution to 9:16">
                            <Button
                                size="medium"
                                variant="contained"
                                color="default"
                                className={styles.toolButton}
                                style={
                                    this.state.canvasRes === '9:16'
                                        ? { pointerEvents: 'none' }
                                        : {}
                                }
                                onClick={() => {
                                    this.setState({
                                        canvasRes: '9:16',
                                    });
                                    this.setCanvasRes(720, 1280);
                                }}
                                disabled={this.state.canvasRes === '9:16'}
                            >
                                <div
                                    className={styles.dimButton}
                                    style={{
                                        color:
                                            this.state.canvasRes === '9:16'
                                                ? 'white'
                                                : 'black',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faExpand} />
                                    <div>9:16</div>
                                </div>
                            </Button>
                        </Tooltip>
                    </ButtonGroup>

                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Draw Area tools"
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
                                onClick={() => {
                                    this.clearCanvas();
                                }}
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
4:3 - 1280x960
16:9 - 1280 x 720
1:1 - 1280x1280
*/
