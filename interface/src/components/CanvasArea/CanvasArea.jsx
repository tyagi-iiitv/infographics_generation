import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import styles from './CanvasArea.module.scss';
import * as d3 from 'd3';
import { canvas_dims, flow_img, dragged_image } from './input1';
import { canvas_dims2, flow_img2, dragged_image2 } from './input2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faEraser,
    faTrash,
    faUpload,
    faDownload,
    faExpand,
} from '@fortawesome/free-solid-svg-icons';

/*
Drawing functions implemented from:
http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
*/

/*
CanvasArea Class
Area where user would drag element and draw the flow
*/
class CanvasArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRes: '4:3', // The present resolution of the canvas
            imgIdx: -1, // The image which is currently being dragged
            vgIdx: -1, // The vg which is currently being dragged
            selectedTool: 'upload', // Tool selected by the user
            isDrawing: false, // Whether the user is drawing/erasing inside the canvas
        };

        this.undraw = this.undraw.bind(this);
        this.clearCanvasArea = this.clearCanvasArea.bind(this);
        this.clearVGs = this.clearVGs.bind(this);
        this.setCanvasRes = this.setCanvasRes.bind(this);
        this.redrawPics = this.redrawPics.bind(this);
        this.drawVGs = this.drawVGs.bind(this);
        this.addPic = this.addPic.bind(this);
        this.getTextWidth = this.getTextWidth.bind(this);
        this.wrap = this.wrap.bind(this);
        this.addVG = this.addVG.bind(this);
        this.addClick = this.addClick.bind(this);
        this.redrawLines = this.redrawLines.bind(this);
        this.getBase64Image = this.getBase64Image.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.imgBelow = this.imgBelow.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.dispCanvas = React.createRef(); // Reference for the canvas area
        this.imgForm = React.createRef(); // Reference for the upload image input

        this.imgs = []; // List of images uploaded by the user
        this.vgs = []; // List of visual group svgs added
        this.clickX = []; // X-coordinates of the drawing/erasing
        this.clickY = []; // Y-coordinates of the drawing/erasing
        this.clickDrag = []; // True if user is clicking
        this.clickColor = []; // Black for pen and white for eraser
        this.canvasDims = { width: 1280, height: 960 }; // Dimensions of the canvas
    }

    /*
    Initializing canavs with default resolution
    */
    componentDidMount() {
        this.setCanvasRes(this.canvasDims.width, this.canvasDims.height);
    }

    /*
    Clears the drawing area from all drawings and uploaded images.
    Does not clears the data saved in memory, so can be redrawn.
    */
    undraw = () => {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /*
    Clears the drawing area as well as the memory, so cannot be redrawn.
    */
    clearCanvasArea = () => {
        // First undraws everything
        this.undraw();
        // Then clears memory
        this.imgs = [];
        this.vgs = [];
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clickColor = [];
        this.setState({
            imgIdx: -1,
        });
    };

    /*
    Removes the Visual Groups added to the canvas
    */
    clearVGs = () => {
        this.undraw();
        this.vgs = [];
        this.redrawLines();
        this.redrawPics();
    };

    /*
    Sets the canvas resolution in pixels
    Resolutions:
    4:3  - 1280 px   x   960 px
    3:4  - 960 px    x   1280 px
    1:1  - 1280 px   x   1280 px
    16:9 - 1280 px   x   720 px
    9:16 - 720 px    x   1280 px
    */
    setCanvasRes(width, height) {
        this.clearCanvasArea();
        const canvas = this.dispCanvas.current;
        canvas.width = width;
        canvas.height = height;
    }

    /*
    Re-adds the uploaded draggable pictures to the canvas
    */
    redrawPics = () => {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');
        // Positions all the images to their past position
        for (const img of this.imgs) {
            ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
        }
    };

    /*
    Adds the Visual Groups to the canvas
    */
    drawVGs = () => {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');
        // Positions all the VGs to their respective positions
        for (const vg of this.vgs) {
            ctx.drawImage(vg.image, vg.x, vg.y, vg.width, vg.height);
        }
    };

    /*
    Adds the uploaded image to the drawing area
    */
    addPic(e) {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');

        var img = new Image();
        if (!e.target.files[0]) {
            return;
        }
        img.src = URL.createObjectURL(e.target.files[0]);
        e.target.value = '';

        img.onload = () => {
            // Currently, setting all uploaded images to fixed width of 200px
            const x = 50;
            const y = 50;
            ctx.drawImage(img, x, y, 200, (img.height * 200) / img.width);

            // Add this image to the list of uploaded images
            const newImg = {
                image: img,
                x: x,
                y: y,
                width: 200,
                height: (img.height * 200) / img.width,
                isDragged: false,
            };
            this.imgs.push(newImg);
        };
    }

    /*
    Returns the width of text in pixels
    */
    getTextWidth(text) {
        // re-use canvas object for better performance
        var canvas =
            this.getTextWidth.canvas ||
            (this.getTextWidth.canvas = document.createElement('canvas'));
        var context = canvas.getContext('2d');
        var metrics = context.measureText(text);
        return metrics.width;
    }

    /*
    Wraps the text in svg using tspan
    */
    wrap(text, width) {
        var words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            // lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr('x'),
            // y = text.attr('y'),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text
                .text(null)
                .append('tspan')
                .attr('x', x)
                // .attr('y', y)
                .attr('dy', dy + 'em');
        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(' '));
            if (this.getTextWidth(tspan.node().textContent) > width) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text
                    .append('tspan')
                    .attr('x', x)
                    // .attr('y', y)
                    .attr('dy', lineHeight + dy + 'em')
                    .text(word);
            }
        }
    }

    /*
    Adds the uploaded SVG image to the drawing area
    */
    addVG(svg, imgLink, x, y) {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');

        var img = new Image();

        var parser = new DOMParser();
        var svgNode = parser.parseFromString(svg, 'image/svg+xml');

        var svgd3 = d3.select(svgNode).select('svg');

        svgd3.select('#wrap').call(this.wrap, 30);

        if (imgLink !== '') {
            var linkImg = new Image();
            linkImg.crossOrigin = 'Anonymous';
            linkImg.src = imgLink;
            linkImg.onload = () => {
                localStorage.setItem('vg-image', this.getBase64Image(linkImg));
            };

            svgd3
                .append('svg:image')
                .attr('xlink:href', localStorage.getItem('vg-image'))
                .attr('crossorigin', 'anonymous')
                .attr('width', 150)
                .attr('height', 150)
                .attr('x', 580)
                .attr('y', 0);

            localStorage.removeItem('vg-item');
        }

        var svgHTML = svgNode.querySelector('svg').outerHTML;
        // console.log(svgHTML);

        img.onload = () => {
            // Currently, setting all uploaded images to fixed width of 200px
            x = x - 100 ?? 50;
            y = y - (img.height * 200) / (2 * img.width) ?? 50;
            ctx.drawImage(img, x, y, 200, (img.height * 200) / img.width);

            // Add this image to the list of uploaded images
            const newImg = {
                image: img,
                x: x,
                y: y,
                width: 200,
                height: (img.height * 200) / img.width,
                isDragged: false,
            };
            this.vgs.push(newImg);
        };

        img.src = URL.createObjectURL(
            new Blob([svgHTML], {
                type: 'image/svg+xml;charset=utf-8',
            })
        );
    }

    /*
    Saves the pointer location, dragging condition and draw colour to the
    list
    */
    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        var curColor;
        // Black if pen, white if eraser
        if (this.state.selectedTool === 'draw') {
            curColor = '#000000';
        } else if (this.state.selectedTool === 'erase') {
            curColor = '#ffffff';
        }
        this.clickColor.push(curColor);
    }
    downloadedImg;

    /*
    Redraws all the lines of the pen and eraser tool
    */
    redrawLines = () => {
        const canvas = this.dispCanvas.current;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 20; // Change for line thickness

        for (var i = 0; i < this.clickX.length; i++) {
            ctx.beginPath();
            if (this.clickDrag[i] && i) {
                // If first point, connect to bottom-left point
                ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                // Else, conenct to last point
                ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            ctx.lineTo(this.clickX[i], this.clickY[i]);
            ctx.closePath();
            ctx.strokeStyle = this.clickColor[i];
            ctx.stroke();
        }
    };

    /*
    Returns Base 64 string of an image
    */
    getBase64Image(img) {
        // re-use canvas object for better performance
        var canvas =
            this.getBase64Image.canvas ||
            (this.getBase64Image.canvas = document.createElement('canvas'));
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
    }

    /*
    Send flow image and dragged locations to server
    */
    async sendInfo() {
        const canvas = this.dispCanvas.current;
        this.undraw();
        this.redrawLines();
        const flowImg = canvas.toDataURL('image/png');
        this.redrawPics();
        this.clearVGs();
        var draggedImages = [];
        this.imgs.forEach((img) => {
            const draggedImage = {
                img: this.getBase64Image(img.image),
                x: img.x,
                y: img.y,
                width: img.width,
                height: img.height,
            };
            draggedImages.push(draggedImage);
        });
        const response = await axios.post('/layout/', {
            canvasDims: canvas_dims,
            flowImg: flow_img,
            draggedImages: dragged_image,
        });
        // console.log({ ...this.canvasDims }, flowImg, draggedImages);
        // const response = await axios.post('/layout/', {
        //     canvasDims: { ...this.canvasDims },
        //     flowImg: flowImg,
        //     draggedImages: draggedImages,
        // });

        const data = response['data'];
        console.log(data);
        // this.props.callbackFromChild({ flows: data.closestFlows });
        var svgs = data.svgs,
            imgLinks = data.imgLinks,
            numVisGrps = data.numVisGrps;

        // Currently displaying the closest flow. There are a total of 5 nearest flows
        const flow = response.data.closestFlows[0];
        if (flow) {
            for (var i = 0; i < numVisGrps; i++) {
                this.addVG(svgs[i], imgLinks[i], flow[i][0], flow[i][1]);
            }
        }

        this.drawVGs();
    }

    /*
    On releasing mouse button,

    If the upload tool is selected: Sets isDragged property of currently
    dragged image ton false, so that no image can be dragged on mouse movement.

    If draw/erase tool is selected: Sets isDrawing condition to false so
    that no lines can be drawn/erased
    */
    onMouseUp(e) {
        if (this.state.selectedTool === 'upload') {
            var i;
            i = this.state.imgIdx;
            if (i !== -1 && this.imgs[i].isDragged) {
                this.imgs[this.state.imgIdx].isDragged = false;
                this.setState({
                    imgIdx: -1,
                });
            }
            i = this.state.vgIdx;
            if (i !== -1 && this.vgs[i].isDragged) {
                this.vgs[this.state.vgIdx].isDragged = false;
                this.setState({
                    vgIdx: -1,
                });
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.setState({
                isDrawing: false,
            });
        }
        e.preventDefault();
    }

    /*
    On taking mouse pointer out of the canvas,

    If draw/erase tool is selected: Sets isDrawing condition to false so
    that no lines can be drawn/erased
    */
    onMouseLeave(e) {
        if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.setState({
                isDrawing: false,
            });
        }
        e.preventDefault();
    }

    /*
    On moving the mouse pointer,

    If the upload tool is selected: If an image is draggable,
    change its position and redraw the canvas.

    If draw/erase tool is selected: Registeres the current mouse
    position to the memory and redraws the canvas.
    */
    onMouseMove(e) {
        const canvas = this.dispCanvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
            // Position of mouse pointer w.r.t the canvas
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            const i = this.state.imgIdx,
                v = this.state.vgIdx;
            if (i !== -1 || v !== -1) {
                var img;
                if (i !== -1 && this.imgs[i].isDragged) {
                    img = this.imgs[i];
                }
                if (v !== -1 && this.vgs[v].isDragged) {
                    img = this.vgs[v];
                }
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
                this.undraw();
                this.redrawLines();
                this.redrawPics();
                this.drawVGs();
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            if (this.state.isDrawing === true) {
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
                this.redrawLines();
                this.redrawPics();
            }
        }
        e.preventDefault();
    }

    /*
    Returns the index of the image in elemType, if it is below the pointer, else,
    returns -1.
    elemType can be either this.imgs or this.vgs.
    */
    imgBelow(canX, canY, elemType) {
        var i,
            x,
            y,
            flag = false;
        for (i in elemType) {
            const img = elemType[i];
            const width = img.width;
            const height = img.height;
            x = img.x;
            y = img.y;
            if (canX < x + width && canX > x && canY > y && canY < y + height) {
                flag = true;
                break;
            }
        }
        if (flag === true) {
            return i;
        } else {
            return -1;
        }
    }

    /*
    On clicking the mouse button,

    If the upload tool is selected: Finds the image which is under the
    mosue pointer and sets it's isDragged property to true so that it
    can eb dragged around.

    If draw/erase tool is selected: Sets the isDrawing condition to true so
    that tit can start drawing.
    */
    onMouseDown(e) {
        const canvas = this.dispCanvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            var i;
            i = this.imgBelow(canX, canY, this.vgs);
            if (i !== -1) {
                this.setState({
                    vgIdx: Number(i),
                });
                const img = this.vgs[i];
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
                this.vgs[i].isDragged = true;
                this.undraw();
                this.redrawLines();
                this.redrawPics();
                this.drawVGs();
            } else {
                i = this.imgBelow(canX, canY, this.imgs);
                if (i !== -1) {
                    this.setState({
                        imgIdx: Number(i),
                    });
                    const img = this.imgs[i];
                    const width = img.width;
                    const height = img.height;
                    img.x = canX - width / 2;
                    img.y = canY - height / 2;
                    this.imgs[i].isDragged = true;
                    this.undraw();
                    this.redrawLines();
                    this.redrawPics();
                    this.drawVGs();
                }
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.clearVGs();
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            this.setState({
                isDrawing: true,
            });
            this.addClick(canX, canY);
            this.undraw();
            this.redrawLines();
            this.redrawPics();
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.canvasAreaContainer}>
                <canvas
                    id="draw_canvas"
                    ref={this.dispCanvas}
                    width="0"
                    height="0"
                    style={{
                        margin: 'auto',
                        display: 'block',
                        maxWidth: '95%',
                        maxHeight: '89%',
                        backgroundColor: 'white',
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 960;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
                            }}
                            disabled={this.state.canvasRes === '4:3'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '4:3'
                                            ? 'whitesmoke'
                                            : '#121212',
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
                                this.canvasDims.width = 960;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
                            }}
                            disabled={this.state.canvasRes === '3:4'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '3:4'
                                            ? 'whitesmoke'
                                            : '#121212',
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
                            }}
                            disabled={this.state.canvasRes === '1:1'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '1:1'
                                            ? 'whitesmoke'
                                            : '#121212',
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 720;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
                            }}
                            disabled={this.state.canvasRes === '16:9'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '16:9'
                                            ? 'whitesmoke'
                                            : '#121212',
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
                                this.canvasDims.width = 720;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
                            }}
                            disabled={this.state.canvasRes === '9:16'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '9:16'
                                            ? 'whitesmoke'
                                            : '#121212',
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
                                this.sendInfo();
                                this.setState({
                                    selectedTool: 'upload',
                                });
                                this.props.getDesignsPressed();
                            }}
                        >
                            Get Designs
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
                                this.setState({
                                    selectedTool: 'upload',
                                });
                                const canvas = this.dispCanvas.current;
                                var canvasImg = canvas.toDataURL('image/png');
                                var tmpLink = document.createElement('a');
                                tmpLink.download = 'infographic.png';
                                tmpLink.href = canvasImg;
                                document.body.appendChild(tmpLink);
                                tmpLink.click();
                                document.body.removeChild(tmpLink);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faDownload}
                                aria-label="Download Canvas"
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
