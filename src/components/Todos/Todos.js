//Step 1 - Read - Add useEffect and useState to the import
import React, { useState, useEffect } from 'react'
import './Resources.css'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleTodos from './SingleTodos'
import {useAuth} from '../../contexts/AuthContext'
import TodosCreate from './TodosCreate';
//step - filter
import FilterCat from './FilterCat';

export default function Resources() {
  //Step 2 - READ - Create a hook to house the data
  const [resources, setResources] = useState([]);//Above we put empty brackets in the initial value for resources so that this file will recognize resources as an array from the beginning. Below we are going to use .map() to read the data, and .map() is only available with collections in JS.
  //STEP 1 - CREATE - Create a button that will open the form, and this hook will conditionally render the form itself
  const [showCreate, setShowCreate] = useState(false);
  const {currentUser} = useAuth()

  //Filter - Below we create a hook that will change when the user clicks the button for the tech they want to see resources for. We will tie the filter to the resource's categoryId
  const [filter, setFilter] = useState(0);

  //Step 3 - READ -Create the function to get the Resources from our API.
  //Make sure that if the API is not deployed, that it is actively running in your browser. We will CTRL + F5 in the ResourcesAPI and have an instance running to make this function work properly.
  //James' local port: http://localhost:59923/api/resources
  const getResources = () => {

    //In order to make the request to the API, we must first install and import axios - npm install axios
    axios.get('http://localhost:61463/api/todo').then(response => {

      console.log(response)
      setResources(response.data)

    })
  }

  //Step 4 - READ - useEffect will automate the component getting the resources as it renders in the virtual DOM
  useEffect(() => {
    getResources();
  }, []);//an empty array in the 2nd param will allow useEffect to run once as the component mounts
  //At this point, we can visit the Resources component in the browser and test to see our data.

  return (
    <section className="resources">
      <article className="bg-info p-5">
        <h1 className="text-center">Todos Dashboard</h1>
      </article>
      {/* Step 2 - CREATE - create the conditional render for the form to populate in */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className="bg-dark p-2 mb-3 text-center">
          <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New Todo' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate &&
              <TodosCreate
                getTodos={getResources}
                setShowCreate={setShowCreate} />
            }                             
          </div>
        </div>
      }
       <FilterCat 
            setFilter={setFilter} />
      {/* Step 5 - READ - create the UI - See SingleResource.js for full implementation */}
      <Container>
        <article className="resourceGallery row justify-content-center">
          {/* Below we write the conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want */}
          {filter === 0 ?
                resources.map(x =>               
                <SingleTodos 
                  key={x.ResourceId} 
                  resource={x} 
                  getResources={getResources}/>
                ) :
                resources.filter(x => x.CategoryId === filter).map(x =>               
                  <SingleTodos 
                    key={x.ResourceId} 
                    resource={x} 
                    getResources={getResources}/>
                  )
              }
              {filter !== 0 && resources.filter(x => x.CategoryId === filter).length === 0 &&
                <h2 className="alert alert-warning text-dark">
                  There are no results for this category.
                </h2>
              }
        </article>
      </Container>
    </section>
  )
}
