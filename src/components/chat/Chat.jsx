import React, { useState, useEffect, useRef } from "react";
import MovementsService from "services/movements.service";


const Chat = (props) => {
    const {content, setContent} = props;

    const [text, setText] = useState('');

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const textareaRef = useRef(null);

    const scrollToBottom = () => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    };

    const directionSwitch = {
      'forward': () => {
          MovementsService.moveForward();
      },
      'backward': () => {
          MovementsService.moveBackward();
      },
      'left': () => {
          MovementsService.moveLeft();
      },
      'right': () => {
          MovementsService.moveRight();
      },
      'stop': () => {
          MovementsService.Stop();
      },
      'default': () => {
          MovementsService.Stop();
      }
    }

    const highlightCommand = (inputText) => {
      const commands = ['right', 'left', 'forward', 'backward', 'stop', 'exit'];
      
      let highlighted = inputText;
      commands.forEach(command => {
        const regex = new RegExp(`(${command})`, 'ig');
        highlighted = highlighted.replace(regex, '[ $1 ]');
      });

      const regexBrackets = /\[([^[\]]+)\]/g;
      const matchedCommands = highlighted.match(regexBrackets);

      if (matchedCommands && matchedCommands.length > 0) {
        const firstMatch = matchedCommands[0].slice(1, -1).trim().toLowerCase();
        if (firstMatch?.length) {
          (directionSwitch[firstMatch] || directionSwitch['default'])();
        }
      }
      
      return highlighted;
    }

    const handleSubmit = () => {
      if (text.length) {
          setContent([...content, `Me : ${highlightCommand(text)}`]);
          setText('');
      }
    }

    useEffect(() => {
      scrollToBottom(); // Call this when the component initially mounts
    }, []);

    useEffect(() => {
      // Scroll to the bottom whenever new lines are added
      scrollToBottom();
    }, [content]);

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