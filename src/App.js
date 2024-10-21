import './App.css';

import RouterElement from './Router.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <RouterElement />
    </>
       
  );
}

export default App;
