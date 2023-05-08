import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app";
import "./App.css";

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  
  useEffect(() => { getOpportunities(); }, []);
  
  // const host = 'http://localhost:8080'

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
    fetch('/api/spaces/' + user.displayName, {
      method: 'GET',
    }).then(
      (res) => {
        if(res.ok){
          res.json().then(data => {
            var oppor = data.spaces.map(space => space.opportunities);
            console.log('oppor', oppor);
            setOpportunities(oppor);
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
    fetch('/api/opportunities/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.displayName,
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

  const handleDismiss = (opportunity) => {
    console.log("On handle dismiss opportunity", opportunity);

    fetch('/api/spaces/opportunities', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.displayName,
        spaceName: opportunity.spaceName,
        title: opportunity.title
      })
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

  const items = (opportunities) => {
    if (opportunities[0] && opportunities[0].length > 0) {
      return (
        <div>
          {opportunities[0].map((item) => (
            <div>
              <li>
                <span><b>SpaceName:</b> {item.spaceName} </span>
                <span><b>Category:</b> {item.category} </span>
                <span><b>Title:</b> {item.title} </span>
                <span><b>Description:</b> {item.description} </span>
                <span><b>Priority:</b> {item.priority} </span>
                <span><button onClick={() => handleDismiss(item)}>Dismiss</button></span>
              </li>
            </div>
          ))}
        </div>
      );
    } else {
      return (<div><li>No Opportunities found. Please ensure a new Space is created.</li></div>);
    }
  };
  
  return (
    <>
      <section>
        <div className="container">
          <h1>List of Opportunities - </h1>
          <ul>
            {items(opportunities)}
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
              Title
              <div className="control">
                <input type="text" name="title" />
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