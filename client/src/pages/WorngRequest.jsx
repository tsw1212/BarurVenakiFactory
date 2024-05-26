import React from 'react';

function WorngRequest({ setWorngRequest }) {
  return (
    <div >
      <h1>something worng...</h1>
      <button onClick={() => { setWorngRequest(false) }}>try again</button>
    </div>
  );
}

export default WorngRequest;
