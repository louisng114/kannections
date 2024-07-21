import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <h1>WELCOME TO <ruby>漢<rt>KAN</rt></ruby>NECTIONS!</h1>
    }
    return <h1>WELCOME BACK, {user.username}!</h1>
};

export default Home;