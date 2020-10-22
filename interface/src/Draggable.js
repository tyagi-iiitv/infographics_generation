import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Draggable.module.scss';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Implemented from: https://stackoverflow.com/a/49348134/10307491
class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relX: 0,
            relY: 0,
            x: props.x,
            y: props.y,
            hovering: false,
        };
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.setHoverTrue = this.setHoverTrue.bind(this);
        this.setHoverFalse = this.setHoverFalse.bind(this);
    }

    onStart(e) {
        const ref = ReactDOM.findDOMNode(this.handle);
        const body = document.body;
        const box = ref.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
        });
    }

    onMove(e) {
        const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
        const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
        if (x !== this.state.x || y !== this.state.y) {
            this.setState({
                x,
                y
            });
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        this.onStart(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    onMouseMove(e) {
        this.onMove(e);
        e.preventDefault();
    }

    onTouchStart(e) {
        this.onStart(e.touches[0]);
        document.addEventListener('touchmove', this.onTouchMove, {passive: false});
        document.addEventListener('touchend', this.onTouchEnd, {passive: false});
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

    onClickDelete = () => {
        this.props.deleteButtonPressed();
    }

    setHoverTrue = () => {
        this.setState({
            hovering: true
        });
    }

    setHoverFalse = () => {
        this.setState({
            hovering: false
        });
    }

    render() {
        return (
            <div
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onTouchStart}
                onMouseEnter={this.setHoverTrue}
                onMouseLeave={this.setHoverFalse}
                className={styles.draggableContent}
                style={{
                    position: 'absolute',
                    left: this.state.x,
                    top: this.state.y,
                }}
                ref={(div) => { this.handle = div; }}
            >
                <div
                    className={styles.removeButton}
                    onClick={this.onClickDelete}
                    style={{
                        opacity: this.state.hovering ? 1 : 0
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </div>
                {React.cloneElement(this.props.children, { hovering: this.state.hovering })}
            </div>
        );
    }
}

export default Draggable;
