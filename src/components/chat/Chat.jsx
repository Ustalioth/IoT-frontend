import React, { useState, useEffect, useRef } from "react";


const Chat = (props) => {
    const {content, setContent} = props;

    const [text, setText] = useState('');

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const textareaRef = useRef(null);

  useEffect(() => {
    scrollToBottom(); // Call this when the component initially mounts
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever new lines are added
    scrollToBottom();
  }, [content]);

    const scrollToBottom = () => {
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      };

    const handleSubmit = () => {
        if (text.length) {
            setContent([...content, `Me : ${text}`]);
            setText('');
        }
    }

    return (
        <div className="container">
            <div className="form-group">
                <label htmlFor="exampleTextarea">Battle chat</label>
                <textarea 
                    id="exampleTextarea" 
                    rows={5}
                    className="form-control border border-info" 
                    disabled
                    value={content.join('\n')}
                    ref={textareaRef}
                />
                
                <div className="d-flex">
                    <input type="text" value={text} onChange={(e) => handleChangeText(e)} className="form-control" />
                    <button onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;