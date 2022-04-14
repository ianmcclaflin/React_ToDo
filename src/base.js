//npm install firebase
//Firebase is a cloud computing tool that includes a lot of features like db
//managment, messaging, maching learning, authentication, and file storage.
//Steps to create authentication functionality
//1. Create a firebase app at firebase.google.com
//2. Register the app with firebase
//3. Configure/Initialize firebase by creating the base.js and .env files
    //a. Make sure the .env file is at the root of the entire project
    //b. base.js is at the root of the src folder
//4. Configure GitHub authentication in Firebase and GitHub
//-----------------------------------------------------------------------------------
//5. Create the context which will house all user info and login/logout 
//functionality
//6. Call to the login/logout/user fuctionality as needed in other 
//components
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Authentication
  const auth = getAuth(app);//This is what ties this local app to the auth
  //functionality in Firebase and GitHub.

  export {auth};//We export auth so we can use this object in our logic in 
  //the React Context(AuthContext)