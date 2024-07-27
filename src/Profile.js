import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      localStorage.setItem('userDetails', JSON.stringify(data));
      setUser(data);
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
