import Home from './Screen/Home';
import './App.css';

  import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";
 import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
 import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
 import Login from './Screen/Login.js';


import SignUp from './SignUp.js';
import { CartProvider } from './component/ContexReducer.js';
import MyOrder from './Screen/MyOrder.js';


function App() {

   

  return (
    <CartProvider>
   <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/SignUp' element={<SignUp/>}/>
        <Route exact path="/myorder" element={<MyOrder />} />
      </Routes>
    </div>
   </Router>
   </CartProvider>
  );
}

export default App;
