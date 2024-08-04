import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const description = (
        <p>
          <strong>KANnections</strong> is a <a href="https://www.nytimes.com/games/connections">Connections</a>-inspired game for reviewing Kanji! Click "Game" on the navigation bar and select a JLPT level to start a game!
        </p>
    );

    if (!user) {
    return (
        <div>
        <h1>
            WELCOME TO <ruby>漢<rt>KAN</rt></ruby>NECTIONS!
        </h1>
        {description}
        </div>
    );
    }
    return (
    <div>
        <h1>WELCOME BACK, {user.username}!</h1>
        {description}
    </div>
    );
};

export default Home;