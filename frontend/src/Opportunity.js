import React, { useState, useEffect } from "react"
import "./App.css";

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  useEffect(() => { getOpportunities(); }, []);
  
  const host = 'http://localhost:8080'
//   const resp = {    "spaceOpps":{
//     "category": "Soldering",
//     "title": "Soldering",
//     "opportunity": "hello hello hello",
//     "description": "xxxx...",
//     "priority": "1",
// }}

  const user = "testUser"

  const getOpportunities = () => {
    console.log('inside getOpportunities');

    fetch(host+'/api/opportunities', {
      method: 'GET',
    }).then(
      (res) => {
        if(res.ok){
          res.json().then(data => {
            console.log(data)
            setOpportunities(data,user);
          });
        }else{
          console.log('error in fetching opportunities');
          setOpportunities([]);
        }
      });
  }

  const creatOpportunity = (event) => {
    event.preventDefault();
    console.log("On handle create opportunity");
    
    fetch(host+'/api/opportunities/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: 'TestName', //TODO space name
        category: 'test-category', //event.target.category.value,
        title: 'test-title', //event.target.title.value,
        opportunity: 'test-opportunity', //event.target.opportunity.value,
        description: 'test-description', //event.target.description.value,
        priority: '1',  //event.target.priority.value,
      })
    }).then(
      (res) => {
        if(res.ok){
          res.json().then( data => {
            console.log(data);
            onLoad();
          });
        }else{
          console.log('error in fetching opportunities');
          setOpportunities([]);
        }
      }
    );
  }
  const onLoad = () => {
    getOpportunities();
    console.log(opportunities);
  };

  const items = ()=>{
    if(opportunities && opportunities.spaceOpps.length > 0)
    opportunities.spaceOpps.map(item => (
    <li>
      <span>{item.category}</span>
      <span>{item.title}</span>
      <span>{item.description}</span>
      <span>{item.priority}</span>
      <span><button onClick={handleDismiss(item.title)}>Dismiss</button></span>
    </li>
  ));

  const handleDismiss = (opportunity) => {
    fetch(host+'/api/spaces/' +  'test' + '/opportunities/remove/' + opportunity, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (res) => {
        if(res.ok){
          res.json().then( data => {
            console.log(data);
            onLoad();
          });
        }
      }
    );
  };
  
  return (
    <>
      <section>
        <div className="container">
          <h1>List of Opportunities</h1>
          <ul>
            {items}
          </ul>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>Create A New Opportunity</h2>
          <form onSubmit={creatOpportunity}>
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