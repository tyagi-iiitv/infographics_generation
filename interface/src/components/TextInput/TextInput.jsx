import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import styles from './TextInput.module.scss';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

/*
TextInputClass
Area where user would add the text to describe the infographic
*/
class TextInput extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '', // Text
            renderedText: '', // Text to render in the preview area
            previewChecked: false, // To show preview or text area
        };
        this.info = []; // Information about visual groups from the input
        this.numVisGrps = 0; // Number of visual groups

        // Tooltip to help users understand how to type in the information.
        this.tooltipInfo = (
            <div>
                Enter the information in the input box below. <br />
                <br />
                For each Visual Group, <br />
                - Use '# title' for adding a title <br />
                - Use '## label' for adding a label <br />
                - Use '![image alt text](image url)' for adding an image <br />
                - Enter text in a new line to add text <br />
                - In case the visual group does not contain a title, use an empty '#'
                to signal the start of a new visual group <br />
                <br />
                In the preview window, each visual group is separated by a horizontal
                line and the label (if present) is displayed before the title, in
                brackets.
            </div>
        );

        this.handleChangeText = this.handleChangeText.bind(this);
    }

    /*
    Handles the text input area for extracting information and previewing
    */
    async handleChangeText(value, e) {
        var text = value;
        // console.log(text);
        // Get a list of lines
        var lines = text.split('\n');
        var i;

        // Remove empty lines
        for (i = lines.length - 1; i >= 0; i--) {
            lines[i] = lines[i].trim();
            if (lines[i].length === 0) {
                lines.splice(i, 1);
            }
        }

        // Gets a the title, label, images, image alt texts and body texts of each
        // visual group and saves them in an object
        var info = [];
        var element = {};
        for (i = 0; i < lines.length; i++) {
            // Title of the visual group
            if (lines[i].startsWith('#') && !lines[i].startsWith('##')) {
                // If element is not empty push it to the list and
                // creates new element again
                if (Object.entries(element).length !== 0) {
                    if (!('title' in element)) {
                        element.title = '';
                    }
                    if (!('label' in element)) {
                        element.label = '';
                    }
                    if (!('image' in element)) {
                        element.image = '';
                    }
                    if (!('imageAlt' in element)) {
                        element.imageAlt = '';
                    }
                    if (!('text' in element)) {
                        element.text = '';
                    }
                    info.push(element);
                    element = {};
                }
                element.title = lines[i].substring(1, lines[i].length).trim();
                // Label of the visual group
            } else if (lines[i].startsWith('##')) {
                if (!element.label) {
                    element.label = lines[i].substring(2, lines[i].length).trim();
                }
            } else if (lines[i].match(/!\[.*\]\(.*\)/i)) {
                if (!element.image) {
                    // Image alt text
                    var imgAltText = lines[i].substring(
                        lines[i].lastIndexOf('[') + 1,
                        lines[i].lastIndexOf(']')
                    );
                    // Image link
                    var imgLink = lines[i].substring(
                        lines[i].lastIndexOf('(') + 1,
                        lines[i].lastIndexOf(')')
                    );
                    if (imgLink !== '') {
                        element.imageAlt = imgAltText;
                        element.image = imgLink;
                    }
                }
                // Body text
            } else {
                if (!('text' in element)) {
                    element.text = '';
                }
                element.text += ` ${lines[i]}`;
            }
        }
        // Storing the last object
        if (Object.entries(element).length !== 0) {
            if (!('title' in element)) {
                element.title = '';
            }
            if (!('label' in element)) {
                element.label = '';
            }
            if (!('image' in element)) {
                element.image = '';
            }
            if (!('imageAlt' in element)) {
                element.imageAlt = '';
            }
            if (!('text' in element)) {
                element.text = '';
            }
            info.push(element);
            element = {};
        }

        var renderedText = '';
        var j;
        // Goes over the info array and generates the HTML for previewing it
        for (j = 0; j < info.length; j++) {
            var visGrp = info[j];
            renderedText +=
                `<div\n` +
                `   style='border-bottom:0.5px dashed black;'\n` +
                `   onMouseEnter={this.style.background='#152028'}\n` +
                `   onMouseLeave={this.style.background='#121212'}\n` +
                `>\n`;
            renderedText += `<p align='center'><u>Visual Group #${j + 1}</u></p>\n`;
            // If no label, just add title as a level 1 heading
            if (visGrp.label !== '') {
                renderedText += `<h1>(${visGrp['label']}) ${visGrp['title']}</h1>\n`;
            }
            // Enter the label as (<label>) before the title in the heading
            else {
                renderedText += `<h1>${visGrp.title}</h1>\n`;
            }
            // Displays all the text as bullets
            if (visGrp['text'].length > 0) {
                renderedText += `<p>Text:</p>\n`;
                renderedText += `<ul>\n`;
                renderedText += `<li>${visGrp['text']}</li>\n`;
                renderedText += `</ul>\n`;
            }
            // Displays the image
            if (visGrp['image'] !== '') {
                renderedText += `<p>Images:</p>\n`;
                renderedText += `<ul>\n`;
                renderedText +=
                    `<li><img\n` +
                    `   src=${visGrp['image']}\n` +
                    `   alt='${visGrp['imageAlt']}'\n` +
                    `   height=200px></li>\n`;
                renderedText += `</ul>\n`;
            }
            renderedText += `</div>\n`;
        }
        this.numVisGrps = info.length;
        this.info = info;
        const response = await axios.post('/visgrps/', {
            numVisGrps: this.numVisGrps,
            visGrpsInfo: this.info,
        });
        if (response.status !== 200) {
            console.log(response);
        }
        this.setState({
            text,
            renderedText,
        });
        this.props.callbackFromChild({ textInfo: this.info });
    }

    render() {
        return (
            <div className={styles.textInputContainer}>
                <div className={styles.textInputHeader}>
                    <div style={{ color: 'white', fontSize: 14 }}>
                        {/* {`Text Input Area `} */}
                        <Tooltip title={this.tooltipInfo} arrow>
                            <span>
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </span>
                        </Tooltip>
                    </div>
                    <div className={styles.previewSwitch}>
                        <div
                            style={{
                                color: 'white',
                                fontSize: 18,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                        >
                            Preview Input
                        </div>
                        <Switch
                            checked={this.state.previewChecked}
                            color="secondary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={() => {
                                this.setState({
                                    previewChecked: !this.state.previewChecked,
                                });
                            }}
                        />
                    </div>
                </div>
                <form className={styles.inputForm}>
                    {/* <textarea
                        id="input_text"
                        className={styles.inputArea}
                        onChange={this.handleChangeText}
                        placeholder="Enter the information about visual groups here..."
                        style={{
                            display: !this.state.previewChecked ? 'block' : 'none',
                        }}
                    /> */}
                    <AceEditor
                        placeholder=""
                        mode="markdown"
                        theme="twilight"
                        name="blah2"
                        height="100%"
                        width="100%"
                        onChange={this.handleChangeText}
                        fontSize={15}
                        wrapEnabled={true}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        style={{
                            display: !this.state.previewChecked ? 'block' : 'none',
                        }}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 4,
                        }}
                    />
                    <div
                        id="preview_text"
                        className={styles.previewArea}
                        dangerouslySetInnerHTML={{
                            __html: this.state.renderedText,
                        }}
                        style={{
                            display: this.state.previewChecked ? 'block' : 'none',
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default TextInput;
