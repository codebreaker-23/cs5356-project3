import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app";
import "./App.css";



const Spaces = () => {

    const [opportunities, setOpportunities] = useState([]);

    var user = null;
    if (firebase.auth().currentUser) {
      const userData = firebase.auth().currentUser;
      user = {
        "uid": userData.uid,
        "displayName": userData.displayName,
        "email": userData.email
      };
    };

    // const host = 'http://localhost:8080'

    const [isImage, setisImage] = useState(false);
    const [spaceIMG, setSpaceIMG] = useState([]);

    useEffect(() => {
        getSpaceName()
      }, []);


    const getSpaceName = () => {
        fetch('/api/spaces/' + user.displayName, {
          method: 'GET',
        }).then(
          (res) => {
            if(res.ok){
              res.json().then(data => {
                var oppor = data.spaces.map(space => space.opportunities);
                console.log('oppor', oppor)
                setOpportunities(oppor);
                var img = data.spaces.map(space => space.img);
                if (img[0] != "" && oppor[0].length > 0) {
                    setisImage(true);
                    console.log('fetching image')
                    fetch('/api/image/' + user.displayName + '/' + oppor[0][0].spaceName, {
                    method: 'GET',
                    }).then(
                    (res) => {
                        if(res.ok){
                        res.json().then(data => {
                            setSpaceIMG(data.image);
                            console.log(data.image)
        
                        });
                        }else{
                        setSpaceIMG([]);
                     }
                    });
                }
              });
            }else{
              console.log('error in fetching opportunities');
              setOpportunities([]);
              setisImage(false)
            }
          });
      };

    

      const items = (opportunities, isImage, spaceIMG) => {
        if (opportunities[0] && opportunities[0].length > 0) {
          return (
            <div>
              {opportunities[0].map((item) => (
                <div key = "{item}">
                  <li>
                    <span><b>SpaceName:</b> {item.spaceName} </span>
                    </li>
                    { !isImage && <b>No Images for this Space Yet</b>}
                    {isImage && <img src={spaceIMG} alt="Table" style={{height: 500}} />}
                </div>
              ))}
            </div>
          );
        } else {
          return (<div><li>No Spaces Found.</li></div>);
        }
      };

    return(
        <div className = "section">
        <h1 className = "title" style = {{marginBottom: "40px",padding: "15px" }}>
            Spaces
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "20% 60%", gridGap: 5 }}>
            <div style={{height: "55px", color: "drakgrey", marginLeft:"auto", marginRight: "auto", padding: "15px",
    backgroundColor: "lightgrey", display: "flex", justifyContent: "center",  borderRadius: "25px", alignItems: "right", width:"50%"}} >
                <h5 className = "subtitle is-6">
                    3D Model
                </h5>
            </div>
            <div className = "center" style={{display: "block", width: "50%", marginLeft:"auto", marginRight: "auto"}} > 
            <ul>
                {items(opportunities, isImage, spaceIMG)}
            </ul>
            </div>
        </div>

        </div>
    );
};

export default Spaces;

// TODO: get and display images from web with an interactive button. (for makeers day)
// TODO: get and display images from /backend API with an interactive button. (for startup systems)