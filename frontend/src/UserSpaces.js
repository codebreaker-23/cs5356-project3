import React, { useState, useEffect } from "react"

const ListSpaces = props => {
    return (
      <>
        <div className="has-text-centered mb-5">
          <h1 className="title">Your Spaces</h1>
        </div>
        <div
          style={{
            marginLeft: "25%",
            marginRight: "25%",
          }}
        >
        </div>
      </>
    );
  };

const CreateSpace = props => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit create space')
    // TODO: update this
  };

  return (
    <>
      <div className="has-text-centered mb-5">
        <h1 className="title">Create Space</h1>
      </div>
      <div
        style={{
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">
              Space name
            </label>
            <div className="control">
              <input type="text" name="name" />
            </div>
          </div>
          <div className="field has-text-centered">
            <div className="control">
              <input type="submit" value="Enter" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  useEffect(()=> {getUserSpaces();}, []);

  const getUserSpaces = () => {
    // fetch('/api/classes', { method: 'GET' }).then(
    //   (res) => {
    //     if(res.ok){
    //       res.json().then((value)=>{
    //         console.log(value.classes);
    //         setSpaces(value.classes);
    //       });
    //     }else{
    //       res.json().then( value => console.log(value));
    //       setSpaces([]);
    //     }

    //   });
    console.log('inside getUserSpaces');
  }
  const onLoad = () => {
    // console.log('onCodeGenerated')
    getUserSpaces();
  };

  const onSpaceCreated = () => {
    // console.log('onClassCreated')  
    getUserSpaces();
  };
  return (
    <>
      <section>
        <div className="container">
          <ListSpaces spaces={spaces} onLoad={onLoad} />
        </div>
      </section>
      <section>
        <div className="container">
          <CreateSpace onSpaceCreated={onSpaceCreated} />
        </div>
      </section>
    </>
  );
};

export default Spaces;