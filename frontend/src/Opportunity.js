import React, { useState, useEffect } from "react"

const Opportunity = () => {
    const [options, setOptions] = useState([]);
    useEffect(()=> {getOptions();}, []);
  
    const getOptions = () => {
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
      console.log('inside getOptions');
    }
    const onLoad = () => {
      // console.log('onCodeGenerated')
      getOptions();
    };
  
    const onCreate = () => {
      // console.log('onClassCreated')  
      getOptions();
    };
    return (
      <>
        <section>
          <div className="container">
          </div>
        </section>
        <section>
          <div className="container">
          </div>
        </section>
      </>
    );
  };

  export default Opportunity;