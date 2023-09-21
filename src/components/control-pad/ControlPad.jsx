import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, SquareFill } from 'react-bootstrap-icons';
//import MovementsService from "services/movements.service";


const ControlPad = (props) => {

    const { chat, setChat } = props;

    const directionSwitch = {
        'Up': () => {
            //MovementsService.moveForward();
            setChat([...chat, 'Me: Forward']);
        },
        'Down': () => {
            //MovementsService.moveBackward();
            setChat([...chat, 'Me: Backward']);
        },
        'Left': () => {
            //MovementsService.moveLeft();
            setChat([...chat, 'Me: Left']);
        },
        'Right': () => {
            //MovementsService.moveRight();
            setChat([...chat, 'Me: Right']);
        },
        'Stop': () => {
            //MovementsService.Stop();
            setChat([...chat, 'Me: Stop']);
        },
        'default': () => {
            //MovementsService.Stop();
        }
    }

    const handleDirectionClick = (direction) => {
        (directionSwitch[direction] || directionSwitch['default'])();
    };

    return (
        <Container className="d-flex flex-column">
            <Row className="d-flex">
                <Col></Col>
                <Col>
                    <button onClick={() => handleDirectionClick('Up')}>
                        <ArrowUp size={50} />
                    </button>
                </Col>
                <Col></Col>
            </Row>
            <Row className="d-flex justify-center">
                <Col>
                    <button onClick={() => handleDirectionClick('Left')}>
                        <ArrowLeft size={50} />
                    </button>
                </Col>
                <Col>
                    <button onClick={() => handleDirectionClick('Stop')}>
                        <SquareFill size={50} />
                    </button>
                </Col>
                <Col>
                    <button onClick={() => handleDirectionClick('Right')}>
                        <ArrowRight size={50} />
                    </button>
                </Col>
            </Row>
            <Row className="d-flex">
                <Col></Col>
                <Col>
                    <button onClick={() => handleDirectionClick('Down')}>
                        <ArrowDown size={50} />
                    </button>
                </Col>
                <Col></Col>
            </Row>            
        </Container>
    );
}

export default ControlPad;