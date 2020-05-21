import React, { useState } from "react";
import "./Profile.css";

const Profile = (props) => {
  const { user } = props;
  const [username, setUsername] = useState(user.name);
  const [age, setUserAge] = useState(user.age);
  const [pet, setUserPet] = useState(user.pet);

  const onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        setUsername(event.target.value);
        break;
      case "user-age":
        setUserAge(event.target.value);
        break;
      case "user-pet":
        setUserPet(event.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = (data) => {
    fetch(`http://localhost:3001/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          props.toggleModal();
          props.loadUser({ ...user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{username}</h1>
          <h4>{`Images Submitted : ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            onChange={onFormChange}
            className="pa2  ba  w-100"
            placeholder={username}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">
            Age:
          </label>
          <input
            onChange={onFormChange}
            className="pa2  ba  w-100"
            placeholder={age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">
            Pet:
          </label>
          <input
            onChange={onFormChange}
            className="pa2  ba  w-100"
            placeholder={pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate({ name: username, age, pet })}
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={props.toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={props.toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
