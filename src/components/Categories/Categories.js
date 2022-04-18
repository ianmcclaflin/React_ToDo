//STEP 1 - CategoriesRead
import React, { useState, useEffect } from 'react'
import './Categories.css'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory';
//STEP 1 - CatCreate - Import the useAuth
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate';

export default function Categories() {
    //STEP 2 - CategoriesRead
    const [categories, setCategories] = useState([]);

    //STEP 2 - CatCreate - currentUser & state varaible for showCreate
    const { currentUser } = useAuth()
    const [showCreate, setShowCreate] = useState(false);


    //Step 3 - CategoriesRead - Create the function (includes importing Axios)
    const getCategories = () => {

        axios.get('http://todoapi.ianmcclaflin.com/api/categories/').then(response => {
            setCategories(response.data)
        })

    }

    //Step 4 - CategoriesRead - useEffect
    //1st param is a function (what to do), 2nd param is an array (event listener)
    useEffect(() => {
        getCategories()
    }, []);//at this point you can test in browser by inspecting the component's state data

    return (
        <section className="categories">
            <article className="bg-info p-5">
                <h1 className="text-center">Categories Dashboard</h1>
            </article>
            {/* Step 3 - CatCreate - button and form conditional rendering */}
            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                <div className="bg-dark p-2 mb-3 text-center">
                    {showCreate ?
                        <>
                            <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                                Cancel
                            </button>
                            {/* Step 6 - CatCreate - Render the CatCreate */}
                            <CatCreate 
                                setShowCreate={setShowCreate}
                                getCategories={getCategories} />
                        </> :
                        <button onClick={() => setShowCreate(true)} className="btn btn-info">
                            Create New Category
                        </button>
                    }
                </div>
            }
            <Container className="p-2">
                <table className="table bg-info table-dark mt-3 mb-3">
                    <thead className="table-secondary text-uppercase">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>     
                           {/* Step 1 - Edit/Delete - Add any conditional rendering you need to display the edit/delete buttons. Here we add an extra th to the table for when the user's an admin.  We also passed getCategories as a prop below in SingleCategory */}
                            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                                <th>Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* STEP 5 - CategoriesRead - map the categories to the SingleCategory component */}
                        {categories.map(x =>
                            <SingleCategory
                                key={x.CategoryId}
                                category={x}
                                getCategories={getCategories} />
                            //we pass getCategories so that in CatEdit and the delete function, we can call to the API to get an updated list of categories    
                        )}
                    </tbody>
                </table>
            </Container>
        </section>
    )
}
