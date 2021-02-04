import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from './CanvasArea.module.scss';
import { saveAs } from 'file-saver';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faEraser,
    faTrash,
    faUpload,
    faExpand,
    faDownload,
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
            imgIdx: -1,
            selectedTool: 'upload',
            isPainting: false,
        };
        this.draw_canvas = React.createRef();
        this.imgForm = React.createRef();
        this.undraw = this.undraw.bind(this);
        this.clearCanvasArea = this.clearCanvasArea.bind(this);
        this.setCanvasRes = this.setCanvasRes.bind(this);
        this.redrawPics = this.redrawPics.bind(this);
        this.addPic = this.addPic.bind(this);
        this.addClick = this.addClick.bind(this);
        this.redraw = this.redraw.bind(this);
        this.downloadCanvasFlow = this.downloadCanvasFlow.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.imgs = [];
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clickColor = [];
    }

    componentDidMount() {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        this.setCanvasRes(1280, 960);
        ctx.fillStyle = 'ghostwhite';
    }

    undraw = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'ghostwhite';
    };

    clearCanvasArea = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'ghostwhite';
        this.imgs = [];
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clickColor = [];
        this.setState({
            imgIdx: -1,
        });
    };

    setCanvasRes(width, height) {
        const canvas = this.draw_canvas.current;
        canvas.width = width;
        canvas.height = height;
        this.clearCanvasArea();
    }

    redrawPics = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        for (const img of this.imgs) {
            ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
        }
    };

    addPic(e) {
        e.preventDefault();
        if (!e.target.files[0]) {
            return;
        }

        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = URL.createObjectURL(e.target.files[0]);
        e.target.value = '';
        img.onload = () => {
            ctx.drawImage(img, 50, 50, 200, (img.height * 200) / img.width);

            const newImg = {
                image: img,
                x: 50,
                y: 50,
                width: 200,
                height: (img.height * 200) / img.width,
                isDragged: false,
            };
            this.imgs = this.imgs.concat(newImg);
        };
    }

    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        var curColor;
        if (this.state.selectedTool === 'draw') {
            curColor = '#000000';
        } else if (this.state.selectedTool === 'erase') {
            curColor = '#f8f8ff';
        }
        this.clickColor.push(curColor);
    }

    redraw = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 20;

        for (var i = 0; i < this.clickX.length; i++) {
            ctx.beginPath();
            if (this.clickDrag[i] && i) {
                ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            ctx.lineTo(this.clickX[i], this.clickY[i]);
            ctx.closePath();
            ctx.strokeStyle = this.clickColor[i];
            ctx.stroke();
        }
    };

    downloadCanvasFlow = () => {
        const canvas = this.draw_canvas.current;
        this.undraw();
        this.redraw();
        saveAs(canvas.toDataURL(), 'flow.png');
        this.redrawPics();
    };

    onMouseUp(e) {
        if (this.state.selectedTool === 'upload') {
            for (var img of this.imgs) {
                img.isDragged = false;
            }
            this.setState({
                imgIdx: -1,
            });
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.setState({
                isPainting: false,
            });
        }
        e.preventDefault();
    }

    onMouseLeave(e) {
        if (this.state.selectedTool === 'draw') {
            this.setState({
                isPainting: false,
            });
        }
        e.preventDefault();
    }

    onMouseMove(e) {
        const canvas = this.draw_canvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
            const i = this.state.imgIdx;
            if (i !== -1 && this.imgs[i].isDragged) {
                const canX =
                    ((e.pageX - scaledCanvas.x - window.scrollX) /
                        scaledCanvas.width) *
                    canvas.width;
                const canY =
                    ((e.pageY - scaledCanvas.y - window.scrollY) /
                        scaledCanvas.height) *
                    canvas.height;
                const img = this.imgs[i];
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
                this.undraw();
                this.redraw();
                this.redrawPics();
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            if (this.state.isPainting === true) {
                const canX =
                    ((e.pageX - scaledCanvas.x - window.scrollX) /
                        scaledCanvas.width) *
                    canvas.width;
                const canY =
                    ((e.pageY - scaledCanvas.y - window.scrollY) /
                        scaledCanvas.height) *
                    canvas.height;
                this.addClick(canX, canY, true);
                this.undraw();
                this.redraw();
                this.redrawPics();
            }
        }
        e.preventDefault();
    }

    onMouseDown(e) {
        const canvas = this.draw_canvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            var i,
                x,
                y,
                flag = false;
            for (i in this.imgs) {
                const img = this.imgs[i];
                const width = img.width;
                const height = img.height;
                x = img.x;
                y = img.y;
                console.log(canX, canY, x, y, width, height);
                if (canX < x + width && canX > x && canY > y && canY < y + height) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                this.setState({
                    imgIdx: Number(i),
                });
                const img = this.imgs[i];
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
                this.undraw();
                this.redraw();
                this.redrawPics();
                this.imgs[i].isDragged = true;
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            this.setState({
                isPainting: true,
            });
            this.addClick(canX, canY);
            this.redraw();
        }
        e.preventDefault();
    }

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
                        maxWidth: '95%',
                        maxHeight: '89%',
                        backgroundColor: 'ghostwhite',
                    }}
                    className={styles.canvasArea}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
                />
                <div className={styles.canvasToolbox}>
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Resolution change button group"
                    >
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
                    </ButtonGroup>
                    <input
                        accept="image/*"
                        ref={this.imgForm}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={this.addPic}
                    />
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Download Tools"
                    >
                        <Button
                            size="medium"
                            variant="contained"
                            color="secondary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.downloadCanvasFlow();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faDownload}
                                aria-label="Download Image"
                            />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Draw Area tools"
                    >
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.setState({
                                    selectedTool: 'upload',
                                });
                                this.imgForm.current.click();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faUpload}
                                aria-label="Upload Image"
                            />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                if (this.state.selectedTool === 'draw') {
                                    this.setState({
                                        selectedTool: 'upload',
                                    });
                                } else {
                                    this.setState({
                                        selectedTool: 'draw',
                                    });
                                }
                            }}
                            style={
                                this.state.selectedTool === 'draw'
                                    ? { backgroundColor: '#101536' }
                                    : {}
                            }
                            disableElevation={this.state.selectedTool === 'draw'}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} aria-label="Draw" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                if (this.state.selectedTool === 'erase') {
                                    this.setState({
                                        selectedTool: 'upload',
                                    });
                                } else {
                                    this.setState({
                                        selectedTool: 'erase',
                                    });
                                }
                            }}
                            style={
                                this.state.selectedTool === 'erase'
                                    ? { backgroundColor: '#101536' }
                                    : {}
                            }
                            disableElevation={this.state.selectedTool === 'erase'}
                        >
                            <FontAwesomeIcon icon={faEraser} aria-label="Erase" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.setState({
                                    selectedTool: 'upload',
                                });
                                this.clearCanvasArea();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                aria-label="Clear Draw Area"
                            />
                        </Button>
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
