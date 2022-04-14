//npm install yup - This is for a validation tool - see implementation below
//npm install formik - This allows us to create forms easily in React
import * as Yup from 'yup'
//Here we import everything from the Yup package and alias it as Yup

//Edit step 3 - Create cat schema remember your export!!
const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated, and use Yup to define the requirements for each property (required, stringLength, etc.)
    CategoryName: Yup.string().max(25, 'Max 25 Characters').required('Required'), 
    CategoryDescription: Yup.string().max(50, 'Max 50 Characters')
})

const resourceSchema = Yup.object().shape({
    Name: Yup.string().max(25, 'Max 25 Characters').required(),
    Description: Yup.string().max(50, 'Max 50 Characters'),
    Url: Yup.string().max(75, 'Max 75 Characters').required(),
    LinkText: Yup.string().max(25, 'Max 25 Characters').required(),
    CategoryId: Yup.number().required()
})

export {resourceSchema};
export default catSchema;

