import React from 'react';
import Progress from 'react-progressbar';

 
const ProgressBar = () => {
  
    return (
      <div className="border-2">
        <Progress completed={75} />
      </div>
    )
  
}

export default ProgressBar