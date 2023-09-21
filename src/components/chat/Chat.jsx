import React, { useState } from "react";
import { Container } from "react-bootstrap";


const Chat = (props) => {
    const {content, setContent} = props;

    const [text, setText] = useState('');

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        if (text.length) {
            setContent([...content, `Me : ${text}`]);
            setText('');
        }
    }

    return (
        <>
            <Container className="border border-secondary h-50">
                {content?.slice(-5)?.map(item => <p key={item?.movementId}>{item}</p>)}
            </Container>
            
                <input type="text" value={text} onChange={(e) => handleChangeText(e)} />
                <button onClick={handleSubmit}>Submit</button>
            
        </>
    );
}

export default Chat;