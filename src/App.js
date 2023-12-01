import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./home";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./about";
import Contact from "./contact";
import Login from "./login";
import FounderProfile from "./founderProfile";
import MyProfile from "./myprofile";
import MySubmissions from "./mysubmissions";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/founderprofile' element={<FounderProfile />} />
          <Route exact path='/myprofile' element={<MyProfile />} />
          <Route exact path='/mysubmissions' element={<MySubmissions />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;