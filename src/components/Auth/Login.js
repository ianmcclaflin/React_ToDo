import React from 'react'
//Step 1 - accessing user info - import useAuth
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    //Step 2 - create a variable to hold the currentUser, login, or logout
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleAuth(){
        //await keyword to pause any more code from executing until we get the response bace from 
        //Firebase
        await login();
        //utilizes react-router-dom functionality to redirect the user to resources
        return navigate("/resources");
    }

  return (
    <div className="login">
        <article className="bg-info mb-5 p-5 text-dark">
            <h1 className="text-center">Welcome to MyToDo App!</h1>
        </article>
        <Container>
            <Card className="m-2 border-dark text-center">
                <Card.Header className="bg-dark text-white">
                    <h2>Login for full functionlity</h2>    
                </Card.Header>    
                <Card.Body>
                    {/* Step 3 - call the functionality in the UI or use it in the logic portion of the 
                    component. */}
                    <button onClick={() => handleAuth()} className="btn btn-dark">
                        Login with GitHub
                    </button>
                </Card.Body>
            </Card>    
        </Container>    
    </div>
  )
}
