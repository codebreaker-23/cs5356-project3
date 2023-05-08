import React, { useState, useEffect } from "react"
import firebase from "firebase/compat/app";

const Analytics = () => {

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

    const host = 'http://localhost:8080'

    const [isImage, setisImage] = useState(false);
    const [spaceIMG, setSpaceIMG] = useState([]);

    useEffect(() => {
        getSpaceName()
      }, []);

    const getSpaceName = () => {
        fetch(host+'/api/spaces/' + user.displayName, {
          method: 'GET',
        }).then(
          (res) => {
            if(res.ok){
              res.json().then(data => {
                var oppor = data.spaces;
                console.log('oppor', oppor)
                setOpportunities(oppor);
                if (oppor.length > 0) {
                    var img = oppor[0].img
                    if (img[0] != "") {
                        setisImage(true);
                        console.log('fetching image')
                        fetch(host+'/api/heatmap/' + user.displayName + '/' + oppor[0].name, {
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
        if (opportunities[0] && opportunities.length > 0) {
          return (
            <div>
              {opportunities.map((item) => (
                <div key = "{item}">
                  <li>
                    <span><b>SpaceName:</b> {item.name} </span>
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
            Analytics
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "20% 60%", gridGap: 5 }}>
            <div style={{height: "55px", color: "drakgrey", marginLeft:"auto", marginRight: "auto", padding: "15px",
    backgroundColor: "lightgrey", display: "flex", justifyContent: "center",  borderRadius: "25px", alignItems: "right", width:"50%"}} >
                <h5 className = "subtitle is-6">
                    Heat map
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

export default Analytics;

// TODO: get and display images from web with an interactive button. (for makeers day)
// TODO: get and display images from /backend API with an interactive button. (for startup systems)

