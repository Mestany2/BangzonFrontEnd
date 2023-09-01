import { Button } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';

function Home() {
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setMyUser(data[0]));
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setMyUser(data[0]));
    console.warn('thisUser', myUser);
  }, []);

  return (
    <>
      {myUser?.uid === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h1>Hello {user.fbUser.displayName}! </h1>
          <p>Your Bio: {user.bio}</p>
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
