import { useState, useContext, useEffect } from 'react';
import { Card, ListGroup, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import KannectionsApi from '../helpers/api';
import "./Profile.css"

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [currUser, setCurrUser] = useState();
    const [achievements, setAchievements] = useState([]);
    
    // get achievement data on load
    useEffect(() => {
      const fetchCurrUser = async () => {
        try {
          if (user) {
            const currUser = await KannectionsApi.getUser(user.username);
            setCurrUser(currUser);
          }
        } catch (error) {
          console.error('Failed to fetch user: ', error);
        }
      };
      const fetchAllAchievements = async () => {
        try {
          const achievements = await KannectionsApi.getAllAchievements();
          setAchievements(achievements);
        } catch (error) {
          console.error('Failed to fetch achievements:', error);
        }
      };

      fetchCurrUser();
      fetchAllAchievements();
    }, [user]);

    if (!currUser || (achievements && achievements.length === 0)) {
        return <div>Loading...</div>;
      }
    
      return (
        <Card className="profile-card">
          <Card.Body>
            <Card.Title className="profile-username">{user.username}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="profile-item">Total Wins: {currUser.totalWins}</ListGroup.Item>
              <ListGroup.Item className="profile-item">Perfect Wins: {currUser.perfectWins}</ListGroup.Item>
            </ListGroup>
            <Card.Subtitle className="mb-2 text-muted mt-3">Achievements</Card.Subtitle>
            <Table bordered>
              <thead>
                <tr>
                  <th>Achievement Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((achievement) => (
                  <tr key={achievement.code}>
                    <td className={`${currUser.achievements.includes(achievement.code) ? "achieved" : ""}`}>{achievement.name}</td>
                    <td className={`${currUser.achievements.includes(achievement.code) ? "achieved" : ""}`}>{achievement.description}</td>
                    </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      );
};

export default Profile;