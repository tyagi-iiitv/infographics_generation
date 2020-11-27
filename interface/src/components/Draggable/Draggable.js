import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Draggable.module.scss';

import { faTrashAlt, faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
Draggable Class
Implemented from: https://stackoverflow.com/a/49348134/10307491

Can be dragged around on the canvas using dragging and dropping
from mouse.
*/
class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relX: 0,
            relY: 0,
            x: props.x, // x-coordinate of the draggable object
            y: props.y, // y-coordinate of the object
            hovering: false, // True if hovering, false otherwise
            grabbing: false, // True if grabbing, false otherwise
            locked: false, // True if locked in place, false otherwise
        };

        // Grid that the draggable element snaps to
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.toggleLocking = this.toggleLocking.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onStart(e) {
        const ref = ReactDOM.findDOMNode(this.handle);
        const body = document.body;
        const box = ref.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop),
        });
    }

    onMove(e) {
        const canvasArea = document.getElementById('canvas').getBoundingClientRect();
        const ref = ReactDOM.findDOMNode(this.handle);
        const box = ref.getBoundingClientRect();

        let x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
        let y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;

        // Restricts dragging if element is going left or right of canvas
        if (x < canvasArea.left) {
            x = canvasArea.left - 3.2;
        } else if (x > canvasArea.right - box.width) {
            x = canvasArea.right - box.width + 3.2;
        }

        // Restricts dragging if element is going above or below of canvas
        if (y < canvasArea.top) {
            y = canvasArea.top - 24.4;
        } else if (y > canvasArea.bottom - box.height) {
            y = canvasArea.bottom - box.height;
        }

        if (x !== this.state.x || y !== this.state.y) {
            this.setState({
                x,
                y,
            });
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }
    }

    onMouseDown(e) {
        if (this.state.locked === false) {
            if (e.button !== 0) return;
            this.onStart(e);
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
            this.setState({
                grabbing: true,
            });
            e.preventDefault();
        }
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        this.setState({
            grabbing: false,
        });
        e.preventDefault();
    }

    onMouseMove(e) {
        this.onMove(e);
        e.preventDefault();
    }

    onTouchStart(e) {
        this.onStart(e.touches[0]);
        document.addEventListener('touchmove', this.onTouchMove, { passive: false });
        document.addEventListener('touchend', this.onTouchEnd, { passive: false });
        e.preventDefault();
    }

    onTouchMove(e) {
        this.onMove(e.touches[0]);
        e.preventDefault();
    }

    onTouchEnd(e) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    // Handles deleting the object by calling the handleRemove
    // function in the App Class
    onClickDelete = () => {
        this.props.deleteButtonPressed();
    };

    // Toggles the hovering state
    toggleHover = () => {
        if (this.state.hovering === false) {
            this.setState({
                hovering: true,
            });
        } else {
            this.setState({
                hovering: false,
            });
        }
    };

    // Toggles the locking state
    toggleLocking = () => {
        if (this.state.locked === false) {
            this.setState({
                locked: true,
            });
        } else {
            this.setState({
                locked: false,
            });
        }
    };

    render() {
        return (
            <div
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onTouchStart}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                className={styles.draggableContent}
                style={{
                    position: 'absolute',
                    left: this.state.x,
                    top: this.state.y,
                }}
                ref={(div) => {
                    this.handle = div;
                }}
            >
                <div className={styles.topButtons}>
                    <FontAwesomeIcon
                        icon={this.state.locked ? faLock : faUnlock}
                        className={styles.lockIcon}
                        onClick={this.toggleLocking}
                        style={{
                            // Makes delete button visible when hovered
                            opacity: this.state.hovering ? 1 : 0,
                            color: this.state.locked ? 'red' : 'green',
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        className={styles.trashIcon}
                        onClick={this.onClickDelete}
                        style={{
                            // Makes delete button visible when hovered
                            opacity: this.state.hovering ? 1 : 0,
                        }}
                    />
                </div>
                {
                    // Adds hovering property to child component to change behaviour in
                    // it while hovering on draggable class
                    // Implemented from: https://stackoverflow.com/a/35102287/10307491
                    // For adding more then one child inside an draggable, check above link
                    React.cloneElement(this.props.children, {
                        hovering: this.state.hovering,
                        grabbing: this.state.grabbing,
                        locked: this.state.locked,
                    })
                }
            </div>
        );
    }
}

export default Draggable;
