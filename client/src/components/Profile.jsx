import React, { useState } from "react";
import ProfilePic from "../assets/sung-jin-woo.jpg";
import "../styles/Profile.css";

const Profile = ({ openModal }) => {
  return (
    <div className="profileWrapper">
      <img src={ProfilePic} alt="profile picture" className="profilePic" />
      <p className="username">Syddu</p>
      <p className="email">sydneysantos176@gmail.com</p>
      <button className="editBtn" onClick={() => openModal()}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
