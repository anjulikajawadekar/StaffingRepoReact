import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login1 from './ComponentFirst/LoginPage';
import ReqView from './ComponentFirst/ReqView';
import { Navbar } from 'react-bootstrap';
import NavBar from './ComponentFirst/NavBar';
// import mobileScreen from './ComponentFirst/NavDemo1';
import SignUp from './ComponentFirst/SignUp';
import AddRequisition from './ComponentFirst/AddRequisition';
import AddCandidate from './ComponentFirst/AddCandidate';

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <ToastContainer />
        <Routes>
        <Route path="/" element={<Login1 />}></Route>
        <Route path="/req_view2" element={<ReqView />}></Route>
        {/* <Route path="/navbar" element={<NavBar />}></Route> */}
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/addRequisition" element={<AddRequisition />}></Route>
        <Route path="/addCandidate" element={<AddCandidate />}></Route>
        {/* <Route path="/navdemo1" element={<mobileScreen />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
