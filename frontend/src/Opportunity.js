import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app";
import "./App.css";

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  // const [user, setUser] = useState(null);
  
  useEffect(() => { getOpportunities(); }, []);
  
  const host = 'http://localhost:8080'

  var user = null;
  if (firebase.auth().currentUser) {
    const userData = firebase.auth().currentUser;
    user = {
      "uid": userData.uid,
      "displayName": userData.displayName,
      "email": userData.email
    };
  }
  
  const getOpportunities = () => {
    console.log('inside getOpportunities');
    fetch(host+'/api/spaces/' + user.displayName, {
      method: 'GET',
    }).then(
      (res) => {
        if(res.ok){
          res.json().then(data => {
            console.log(data)
            setOpportunities(data.opportunities);
          });
        }else{
          console.log('error in fetching opportunities');
          setOpportunities([]);
        }
      });
  }

  const onLoad = () => {
    getOpportunities();
  };

  const createOpportunity = (event) => {
    event.preventDefault();
    console.log("On handle create opportunity");
    const spaceName = event.target.spaceName.value;
    fetch(host + '/api/opportunities/space/' + spaceName, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: spaceName,
        category: event.target.category.value,
        title: event.target.title.value,
        opportunity: event.target.opportunity.value,
        description: event.target.description.value,
        priority: event.target.priority.value,
      })
    }).then(
      (res) => {
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            onLoad();
          });
        } else {
          console.log('error in fetching opportunities');
          setOpportunities([]);
        }
      }
    );
  }

  const handleDismiss = (title) => {
    fetch(host + '/api/spaces/opportunities/'+title, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (res) => {
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            onLoad();
          });
        }
      }
    );
  };

  const items = () => {
    if (opportunities && opportunities.spaceOpps && opportunities.spaceOpps.length > 0) {
      return opportunities.spaceOpps.map(item => (
        <li>
          <span>{item.spaceName}</span>
          <span>{item.category}</span>
          <span>{item.title}</span>
          <span>{item.description}</span>
          <span>{item.priority}</span>
          <span><button onClick={handleDismiss(item.title)}>Dismiss</button></span>
        </li>
      ));
    } else {
      return <li>No Opportunities</li>
    }
  };
  
  return (
    <>
      <section>
        <div className="container">
          <h1>List of Opportunities</h1>
          <ul>
            {items()}
          </ul>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Create A New Opportunity</h2>
          <form onSubmit={createOpportunity}>
          <label>
              Space Name
              <div className="control">
              <input type="text" name="spaceName" />
            </div>
            </label>
            <label>
              Category
              <div className="control">
              <input type="text" name="category" />
            </div>
            </label>
            <label>
              Opportunity
              <div className="control">
              <input type="text" name="opportunity" />
            </div>
            </label>
            <label>
              Description
              <div className="control">
              <input type="text" name="description" />
            </div>
            </label>
            <label>
              Priority
              <div className="control">
              <input type="text" name="priority" />
            </div>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Opportunity;