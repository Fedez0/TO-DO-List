import { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
function ButtonTODO(props) {


    return (
        <div className="d-flex justify-content-center mt-4">
            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#modal-task">New task</button>
            <Modal id="modal-task" user={props.user} />
        </div>
    )
}

export default ButtonTODO;