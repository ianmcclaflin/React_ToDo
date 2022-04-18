import React from 'react'
import { Modal } from 'react-bootstrap'
import TodosForm from './TodosForm'

export default function TodosEdit(props) {
    return (
        <Modal
            show={props.showEdit}
            onHide={() => props.setShowEdit(false)}>
                <Modal.Header className="bg-info" closeButton>
                    <h3>Editing {props.resource.Name}</h3>
                </Modal.Header>
                <Modal.Body>
                    <TodosForm
                        resource={props.resource}
                        setShowEdit={props.setShowEdit}
                        getResources={props.getResources} />
                </Modal.Body>
        </Modal>

    )
}
