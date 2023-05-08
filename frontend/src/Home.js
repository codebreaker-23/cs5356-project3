import React from "react";
import firebase from "firebase/compat/app";
import { Link } from 'react-router-dom';

import "./App.css";

const Home = () => {

    const userDetails = (user = firebase.auth().currentUser) => {
        console.log(user);
        if (user) {
            return ({
                "uid": user.uid,
                "displayName": user.displayName,
                "email": user.email
            });
        } else {
            return null;
        }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
                <h1>Welcome {userDetails() ? userDetails().displayName : ""}</h1>
            </div>
            <div className="navbar">
                <Link to="/spaces" className="nav-item">
                    <div className="tab tab1">My Spaces</div>
                </Link>
                <Link to="/opportunity" className="nav-item">
                    <div className="tab tab2">Opportunities</div>
                </Link>
                <Link to="/analytics" className="nav-item">
                    <div className="tab tab3">Analytics</div>
                </Link>
            </div>

            <div className="footer">
                <div className="border"></div>
                <div className="footer-container">
                    <div className="section">
                        <p>&copy; Flowmatic {new Date().getFullYear()}</p>
                    </div>
                    <div className="section">
                        <button className="signout" onClick={() => firebase.auth().signOut()}>Sign Out</button>
                    </div>
                    <div className="section">
                        <p>Contact Us:</p>
                        <ul>
                            <li>Phone: 555-555-5555</li>
                            <li>Email: contact@flowmatic.com</li>
                            <li>Address: 1E Loop Rd, New York USA</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;