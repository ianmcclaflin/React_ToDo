import React, {useState} from 'react'
/* Font Awesome Icons
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CatEdit from './CatEdit'

library.add(fas);

/*
  Steps for Edit/Delete
  1. Categories.js - add the prop getCategories to the SingleCategory component
  2. SingleCategory.js - add the buttons for edit/delete optionally using Font awesome
  3. Wire up the delete function (SingleCategory.js)
  4. Create CatEdit
  5. SingleCategory - create the hook for showEdit and passed showEdit, setShowEdit as props in CatEdit
  6. CatForm - added the edit/put functionality
*/

export default function SingleCategory(props) {
  //Edit step 1 - Create Hooks for current user and show edit
  const { currentUser } = useAuth()
  const [showEdit, setShowEdit] = useState(false);

  const deleteCategory = (id) => {
    console.log(id)

    if (window.confirm(`Are you sure you want to delete ${props.category.CategoryName}?`)) {
      axios.delete(`http://todoapi.ianmcclaflin.com/api/categories/${id}`).then(() => {
        props.getCategories()
      })
    }
  }

  return (
    <tr>
      <td>{props.category.CategoryName}</td>
      <td>{props.category.CategoryDescription}</td>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <td>
          {/* Edit step 2 add the icons and some conditional rendering that checks to see if user has authority to edit. */}
          <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>
          <button className="m-1 rounded" id="deleteLink" onClick={() => deleteCategory(props.category.CategoryId)}>
            {/* <FontAwesomeIcon icon={['fas', 'trash-alt']} /> */}
            <FontAwesomeIcon icon="fa-solid fa-trash" />
          </button>
          {/* Edit Step 6 - Creating the form so you can edit */}
          {showEdit &&
            <CatEdit
              category={props.category}
              setShowEdit={setShowEdit}
              showEdit={showEdit}
              getCategories={props.getCategories} />
          }
        </td>
      }
    </tr>
  )
}

