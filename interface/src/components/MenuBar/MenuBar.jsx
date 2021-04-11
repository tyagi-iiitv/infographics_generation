import React, { Component } from 'react';
import { NavDropdown, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GithubPicker } from 'react-color';

export class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.values.selected };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event }, () => {
            console.log(this.state.value);
        });
    }

    render() {
        let values_array = [];
        for (let i = 0; i < this.props.values.values.length; i++) {
            values_array.push(
                <NavDropdown.Item
                    eventKey={this.props.values.values[i].key}
                    onSelect={this.handleChange}
                >
                    {this.props.values.values[i].name}
                </NavDropdown.Item>
            );
        }

        const upload_button = (
            <NavDropdown style={{ fontSize: 17, paddingLeft: 15 }} title="Upload">
                {values_array}
            </NavDropdown>
        );
        return upload_button;
    }
}

export class Export extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        // download SVG code for the infographic here
    }

    render() {
        return (
            <Nav.Link
                style={{ paddingLeft: 15, fontSize: 17, outline: 'none' }}
                onClick={this.handleClick}
            >
                Export
            </Nav.Link>
        );
    }
}

export class ShowCanvas extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.callbackFromChild({ canvasView: true });
        // download SVG code for the infographic here
    }

    render() {
        return (
            <Nav.Link
                style={{ paddingLeft: 15, fontSize: 17, outline: 'none' }}
                onClick={this.handleClick}
            >
                Canvas
            </Nav.Link>
        );
    }
}

export class ColorPallets extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.values.selected };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event }, () => {
            console.log(this.state.value);
        });
    }

    render() {
        let values_array = [];
        for (let i = 0; i < this.props.values.values.length; i++) {
            values_array.push(
                <NavDropdown.Item
                    eventKey={this.props.values.values[i].key}
                    onSelect={this.handleChange}
                >
                    <GithubPicker
                        width={140}
                        colors={this.props.values.values[i].name}
                        triangle="hide"
                    />
                </NavDropdown.Item>
            );
        }

        const upload_button = (
            <NavDropdown
                style={{ fontSize: 17, paddingLeft: 15 }}
                title="Color-Pallets"
            >
                {values_array}
            </NavDropdown>
        );
        return upload_button;
    }
}

export class ConnectionTypes extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.values.selected };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event }, () => {
            console.log(this.state.value);
        });
    }

    render() {
        let values_array = [];
        for (let i = 0; i < this.props.values.values.length; i++) {
            values_array.push(
                <NavDropdown.Item
                    eventKey={this.props.values.values[i].key}
                    onSelect={this.handleChange}
                >
                    {this.props.values.values[i].name}
                </NavDropdown.Item>
            );
        }

        const upload_button = (
            <NavDropdown
                style={{ fontSize: 17, paddingLeft: 15 }}
                title="Connection-Types"
            >
                {values_array}
            </NavDropdown>
        );
        return upload_button;
    }
}

export class Examples extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.values.selected };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.key }, () =>
            this.props.callbackFromChild({
                inputText: this.props.values.values[event].value,
            })
        );
    }

    render() {
        let values_array = [];
        for (let i = 0; i < this.props.values.values.length; i++) {
            values_array.push(
                <NavDropdown.Item
                    eventKey={this.props.values.values[i].key}
                    onSelect={this.handleChange}
                >
                    {this.props.values.values[i].name}
                </NavDropdown.Item>
            );
        }

        const upload_button = (
            <NavDropdown
                style={{ fontSize: 17, paddingLeft: 15 }}
                title="Load-Examples"
            >
                {values_array}
            </NavDropdown>
        );
        return upload_button;
    }
}

export class About extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        // download SVG code for the infographic here
    }

    render() {
        return (
            <OverlayTrigger
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                overlay={
                    <Popover id={'popover-positioned-bottom'}>
                        <Popover.Title as="h3">Infographics Wizard</Popover.Title>
                        <Popover.Content>
                            Created for automated infographic generation. Paper will
                            be out soon!
                        </Popover.Content>
                    </Popover>
                }
            >
                <Nav.Link
                    style={{
                        paddingLeft: 15,
                        paddingRight: 50,
                        fontSize: 17,
                        outline: 'none',
                    }}
                >
                    About
                </Nav.Link>
            </OverlayTrigger>
        );
    }
}
