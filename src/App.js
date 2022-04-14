import './App.css';
import Navigation from './components/Navigation';
//Below we are going to import a few mechanisms from react-router-dom
//1. Router  2. Routes (kind of like a switch)  3. Route (gives instructions on which component tree to 
//display as different routes are encountered)
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//Components to import


import Todos from './components/Todos/Todos';
import Login from './components/Auth/Login';
import AuthProvider from './contexts/AuthContext';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './components/Homepage/Homepage';
import Categories from './components/Categories/Categories';


// import Bootstrap from './components/Bootstrap/Bootstrap';
// import Routing from './components/Routing/Routing';
// import Resources from './components/Resources/Resources';
// import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
    <AuthProvider>
      <Router>
        {/* The Browser Router is aliased a Router, meaning I can call to Router and have BrowserRouter
        render in this file. We surround Navigation because it has Link components that work with the
        BrowserRouter component. This comes from react-router-dom's docs. */}
        <Navigation />
        {/* For every route we want to render a portion of our site for, we will create a Route component.
        It connects the url path with a specific component to render. */}
        
        <Routes>
          {/* <Route path="/" element={<Resources />} /> */}
          <Route path="Categories" element={<ProtectedRoute><Categories/></ProtectedRoute>} />
          <Route path="Todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          
          {/* <Route path="routing" element={<Routing />} /> */}
          {/* The NotFound component will be our error handling page and will be tied to any other Route
          than what is detailed above. We have Resources, Bootstrap, and Routing which are tied to 
          specific routes. The NotFound component will be tied to any other Route that we haven't 
          detailed. */}
          {/* <Route path="*" element={<NotFound />}/> */} 
        </Routes>
        
        <Footer />
      </Router>
      </AuthProvider>
      

    </div>

  );
}

export default App;