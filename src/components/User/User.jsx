import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_IMAGES_BASE_URL } from "../../config";
import { followUser, unfollowUser } from "../../actions/UserAction";
const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : BACKEND_IMAGES_BASE_URL + "defaultProfile.png"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = BACKEND_IMAGES_BASE_URL + "defaultProfile.png";
          }}
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>
            {person.firstname} {person.lastname}
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
