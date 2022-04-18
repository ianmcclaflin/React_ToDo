import React, {useState, useEffect} from 'react'
//Below we import Formik which will build the form and keep track of changes in the form
import {Formik, Form, Field} from 'formik'
import { resourceSchema } from '../../Utilities/validationSchemas'
import axios from 'axios'

export default function TodosForm(props) {
    //Below is the functionality to get categories to populate the dropdown list in the form
    const [categories, setTodos] = useState([]);

    const getTodos = () => {
        axios.get('http://localhost:61463/api/todo').then(response => { setTodos(response.data)})
    }

    //Create a local function that will submit the form to the ResourceAPI 
    const handleSubmit = (values) => {
        console.log(values)
        //If statement that checks to see if a prop called resource is being passed in. If not we will execute the create code. If so we will execute the edit code
        if(!props.resource){
            // console.log('create mode')

            //Assemble a variable that will house the data from the form so we can send the object in the data portion of the request to the API
            const TodosToCreate = {
                Name: values.Name,
                Description: values.Description,
                // LinkText: values.LinkText,
                // Url: values.Url,
                // CategoryId: values.CategoryId
            }

            axios.post('http://localhost:61463/api/todo', TodosToCreate).then(() => {
                //run a get request against the api to get a new list of resources
                props.getTodos();
                //close the create form 
                props.setShowCreate(false);
            })
        }
        else{
            // console.log('edit mode')
            //temp object
            const TodosToEdit = {
                ResourceId: props.resource.ResourceId,
                Name: values.Name,
                Description: values.Description,
                // Url: values.Url,
                // LinkText: values.LinkText,
                // CategoryId: values.CategoryId
            }

            axios.put('http://localhost:61463/api/todo', TodosToEdit).then(() => {
                props.getTodos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

  return (
    <Formik
        initialValues={{
            //Here we assign the values of the objects in the form's initialValues prop. For create, we will set all of the values to an empty string. But we need a ternary operator in each value to check against if there is a prop called resource (which will pass in an Edit version), then we set the value to that object's value
            Name: props.resource ? props.resource.Name : '',
            // Url: props.resource ? props.resource.Url : '',
            // LinkText: props.resource ? props.resource.LinkText : '',
            Description: props.resource ? props.resource.Description : '',
            CategoryId: props.resource ? props.resource.CategoryId : ''
        }}
        validationSchema={resourceSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {({ errors, touched }) => (
            <Form id="resourceForm">
                <div className="form-group m-3">
                    <Field name="Name" className="form-control" placeholder="Name" />
                    {/* Below is the validation UI */}
                    {errors.Name && touched.Name ? (
                        <div className="text-danger">{errors.Name}</div>
                    ) : null}
                </div>


                <div className="form-group m-3">
                    <Field name="Description" as="textarea" className="form-control" placeholder="Description" style={{ resize: 'none', height: '5em'}}/>
                    {/* Below is the validation UI */}
                    {errors.Description && touched.Description ? (
                        <div className="text-danger">{errors.Description}</div>
                    ) : null}
                </div>
                {/* Below we will handle the input for CategoryId, showing CategoryName */}

                <div className="form-group m-3">
                    <button type="submit" className="btn btn-info m-3">Submit Resource to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
