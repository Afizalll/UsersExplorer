import React from "react";
import { User } from "../types";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <article className="card" aria-label={`User ${user.name}`}>
      <h3 className="card-title">{user.name}</h3>
      <div className="card-row"><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></div>
      <div className="card-row"><strong>City:</strong> {user.address.city}</div>
      <div className="card-row"><strong>Company:</strong> {user.company.name}</div>
      <div className="card-row"><strong>Phone:</strong> <a href={`tel:${user.phone}`}>{user.phone}</a></div>
      <div className="card-row"><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></div>
    </article>
  );
};

export default UserCard;
