//Step 4 - CatCreate - Create the form
import React from 'react'
import {Formik, Form, Field} from 'formik'
import catSchema from '../../Utilities/validationSchemas'
import axios from 'axios'

//Edit step 4 - CatCreate - Create the form
export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)

        if(!props.category){
            // console.log('create mode')
            //Step 7 - CatCreate - create function
            //Assemble a temp object to send the data
            const catToCreate = {
              CategoryName: values.CategoryName,
              CategoryDescription: values.CategoryDescription
            }

            //send to the API
            axios.post('http://localhost:61463/api/categories/', catToCreate).then(() => {
              props.setShowCreate(false)
              props.getCategories()
            })
        }
      else{
        const catToEdit ={
          CategoryId: props.category.CategoryId,
          CategoryName: values.CategoryName,
          CategoryDescription: values.CategoryDescription
        }

        axios.put('http://localhost:61463/api/categories/', catToEdit).then(() => {
          props.getCategories();
          props.setShowEdit(false);
        })
      }
    }

  return (
      <div className="createCategory m-2 text-white text-center">
          <Formik
            initialValues={{
              CategoryName:  props.category ? props.category.CategoryName : '',
              CategoryDescription: props.category ? props.category.CategoryDescription : ''
            }}
            validationSchema={catSchema} 
            onSubmit={values => handleSubmit(values)}
          >
            {({errors, touched}) => (
              <Form id="catForm" className="row text-center m-auto">
                <div className="form-group m-1 p-1">
                  <Field name="CategoryName" className="form-control" placeholder="Name" />
                  {errors.CategoryName && touched.CategoryName ?
                    <div className="text-danger">{errors.CategoryName}</div> :
                    null
                  }
                </div>
                <div className="form-group m-1 p-1">
                  <Field name="CategoryDescription" className="form-control" placeholder="Description" />
                  {errors.CategoryDescription && touched.CategoryDescription ?
                    <div className="text-danger">{errors.CategoryDescription}</div> :
                    null
                  }
                </div>
                <div className="form-group m-1">
                  <button className="btn btn-success" type="submit">Submit Category to API</button>
                </div>
              </Form>
            )}
          </Formik>
      </div>
  )
}
