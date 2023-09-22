import React from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, SquareFill } from 'react-bootstrap-icons';
import MovementsService from "services/movements.service";


const ControlPad = (props) => {

    const { chat, setChat } = props;

    const directionSwitch = {
        'Up': () => {
            MovementsService.moveForward();
            setChat([...chat, 'Me: Forward']);
        },
        'Down': () => {
            MovementsService.moveBackward();
            setChat([...chat, 'Me: Backward']);
        },
        'Left': () => {
            MovementsService.moveLeft();
            setChat([...chat, 'Me: Left']);
        },
        'Right': () => {
            MovementsService.moveRight();
            setChat([...chat, 'Me: Right']);
        },
        'Stop': () => {
            MovementsService.Stop();
            setChat([...chat, 'Me: Stop']);
        },
        'default': () => {
            MovementsService.Stop();
        }
    }

    const handleDirectionClick = (direction) => {
        (directionSwitch[direction] || directionSwitch['default'])();
    };

    return (
        <div className="container min-w-300 min-h-300 max-w-300 max-h-300">
            <table className="table table-borderless h-100 w-100">
                <tbody>
                    <tr>
                        <td className="min-w-100 min-h-100 text-center"></td>
                        <td className="min-w-100 min-h-100 max-w-100 max-h-100 text-center">
                            <button type="button" className="btn btn-dark btn-block" onClick={() => handleDirectionClick('Up')}>
                                <ArrowUp size={50} />
                            </button>
                        </td>
                        <td className="min-w-100 min-h-100 text-center"></td>
                    </tr>
                    <tr>
                        <td className="min-w-100 min-h-100 max-w-100 max-h-100 text-end">
                            <button type="button" className="btn btn-dark btn-block" onClick={() => handleDirectionClick('Left')}>
                                <ArrowLeft size={50} />
                            </button>
                        </td>
                        <td className="min-w-100 min-h-100 max-w-100 max-h-100 text-center">
                            <button type="button" className="btn btn-dark btn-block" onClick={() => handleDirectionClick('Stop')}>
                                <SquareFill size={50} className="text-dark" />
                            </button>
                        </td>
                        <td className="min-w-100 min-h-100 max-w-100 max-h-100 text-start">
                            <button type="button" className="btn btn-dark btn-block" onClick={() => handleDirectionClick('Right')}>
                                <ArrowRight size={50} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-100 min-h-100 text-center"></td>
                        <td className="min-w-100 min-h-100 max-w-100 max-h-100 text-center">
                            <button type="button" className="btn btn-dark btn-block" onClick={() => handleDirectionClick('Down')}>
                                <ArrowDown size={50} />
                            </button>
                        </td>
                        <td className="min-w-100 min-h-100 text-center"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ControlPad;