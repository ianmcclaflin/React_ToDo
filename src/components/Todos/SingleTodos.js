import React, {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import TodosEdit from './TodosEdit'


library.add(fas)

export default function SingleTodos(props) {
    const {currentUser} = useAuth();
    const [showEdit, setShowEdit] = useState(false);

    const deleteResource = (id) => {

        if(window.confirm(`Are you sure you want to delete ${props.resource.Name}?`)){

            axios.delete(`http://localhost:61463/api/todo${id}`).then(() => {props.getResources()})

        }
    }

    return (
        <div className="singleResource col-md-5 m-4">
            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                <div>
                    <button id="editLink" onClick={() => setShowEdit(true)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} />
                    </button>
                    <button id="deleteLink" onClick={() => deleteResource(props.resource.TodosId)}>
                        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                    </button>
                    {showEdit &&
                        <TodosEdit
                            resource={props.resource}
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                            getResources={props.getResources} />
                    }
                </div>
            }
            <h3>{props.resource.Name}</h3>
            {props.resource.Description !== null ?
                <p>{props.resource.Description}</p> :
                <p>No Description Provided</p>
            }            

        </div>
    )
}
