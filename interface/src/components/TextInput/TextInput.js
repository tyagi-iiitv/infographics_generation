import React from 'react';
import styles from './TextInput.module.scss';
import Button from '@material-ui/core/Button';
import marked from 'marked';

/*
TextInputClass
Area where user would add the text to create the infographic
*/
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            mdText: '',
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
    }

    handleSubmitText(e) {
        //if no input or only whitespace, ignore it
        e.preventDefault();
        if (this.state.mdText.trim().length === 0) {
            return;
        }
        this.props.submitText(this.state.mdText.trim());
        this.setState({
            mdText: '',
        });
    }

    handleChangeText(e) {
        this.setState({ mdText: e.target.value });
    }

    render() {
        return (
            <div className={styles.textInputArea}>
                <p style={{ color: 'white' }}>Text Input Area</p>
                <form onSubmit={this.handleSubmitText} className={styles.inputForm}>
                    <textarea
                        id="input_text"
                        className={styles.inputArea}
                        onChange={this.handleChangeText}
                        value={this.state.mdText}
                        placeholder="Enter text here"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                            margin: '10px',
                        }}
                    >
                        Input Text
                    </Button>
                    <div
                        id="preview_text"
                        className={styles.previewArea}
                        dangerouslySetInnerHTML={{
                            __html: marked(this.state.mdText, { sanitize: true }),
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default TextInput;
