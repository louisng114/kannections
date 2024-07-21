import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GamePage from "./components/GamePage";
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';


const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game1" element={<GamePage jlpt={1} />} />
                <Route path="/game2" element={<GamePage jlpt={2} />} />
                <Route path="/game3" element={<GamePage jlpt={3} />} />
                <Route path="/game4" element={<GamePage jlpt={4} />} />
                <Route path="/game5" element={<GamePage jlpt={5} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
