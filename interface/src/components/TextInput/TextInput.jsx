import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import styles from './TextInput.module.scss';

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
        this.sendInfo = this.sendInfo.bind(this);
    }

    /*
    Send the info array to server
    */
    async sendInfo(e) {
        e.preventDefault();
        const response = await axios.post('/visgrps/', {
            numVisGrps: this.numVisGrps,
            visGrpsInfo: this.info,
        });
        console.log(response);
    }

    /*
    Handles the text input area for extracting information and previewing
    */
    handleChangeText(e) {
        var text = e.target.value;
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
                    if (!('images' in element)) {
                        element.images = [];
                    }
                    if (!('imagesAlt' in element)) {
                        element.imagesAlt = [];
                    }
                    if (!('text' in element)) {
                        element.text = [];
                    }
                    info.push(element);
                    element = {};
                }
                element.title = lines[i].substring(1, lines[i].length).trim();
                // Label of the visual group
            } else if (lines[i].startsWith('##')) {
                element.label = lines[i].substring(2, lines[i].length).trim();
            } else if (lines[i].match(/!\[.*\]\(.*\)/i)) {
                var imgAltText = lines[i].substring(
                    lines[i].lastIndexOf('[') + 1,
                    lines[i].lastIndexOf(']')
                );
                // Image Alt text
                if (!('imagesAlt' in element)) {
                    element.imagesAlt = [];
                }
                element.imagesAlt.push(imgAltText);
                var imgLink = lines[i].substring(
                    lines[i].lastIndexOf('(') + 1,
                    lines[i].lastIndexOf(')')
                );
                // Image link
                if (!('images' in element)) {
                    element.images = [];
                }
                element.images.push(imgLink);
                // Body text
            } else {
                if (!('text' in element)) {
                    element.text = [];
                }
                element.text.push(lines[i]);
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
            if (!('images' in element)) {
                element.images = [];
            }
            if (!('imagesAlt' in element)) {
                element.imagesAlt = [];
            }
            if (!('text' in element)) {
                element.text = [];
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
                `   onMouseEnter={this.style.background='#e0ffff'}\n` +
                `   onMouseLeave={this.style.background='white'}\n` +
                `>\n`;

            renderedText += `<p><u>Visual Group #${j + 1}</u></p>`;
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
                for (i = 0; i < visGrp['text'].length; i++) {
                    renderedText += `<li>${visGrp['text'][i]}</li>\n`;
                }
                renderedText += `</ul>\n`;
            }
            // Displays all the images as bullets
            if (visGrp['images'].length > 0) {
                renderedText += `<p>Images:</p>\n`;
                renderedText += `<ul>\n`;
                for (i = 0; i < visGrp['images'].length; i++) {
                    renderedText +=
                        `<li><img\n` +
                        `   src=${visGrp['images'][i]}\n` +
                        `   alt='${visGrp['imagesAlt'][i]}'\n` +
                        `   height=200px></li>\n`;
                }
                renderedText += `</ul>\n`;
            }
            renderedText += `</div>\n`;
        }
        this.numVisGrps = info.length;
        this.info = info;
        this.setState({
            text,
            renderedText,
        });
    }

    render() {
        return (
            <div className={styles.textInputContainer}>
                <p style={{ color: 'white' }}>
                    {`Text Input Area `}
                    <Tooltip title={this.tooltipInfo} arrow>
                        <span>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                    </Tooltip>
                </p>
                <textarea
                    id="input_text"
                    className={styles.inputArea}
                    onChange={this.handleChangeText}
                    value={this.state.text}
                    placeholder="Enter the information about visual groups here..."
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                        margin: '10px',
                    }}
                    onClick={this.sendInfo}
                >
                    Update Info
                </Button>
                <div
                    id="preview_text"
                    className={styles.previewArea}
                    dangerouslySetInnerHTML={{
                        __html: this.state.renderedText,
                    }}
                />
            </div>
        );
    }
}

export default TextInput;
