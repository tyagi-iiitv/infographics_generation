import axios from 'axios';

export default function generatePreview(text) {
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

    return info;
}
