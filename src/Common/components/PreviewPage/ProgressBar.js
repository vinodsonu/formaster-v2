import React from 'react'
import { Line } from 'rc-progress';
import {observer} from 'mobx-react';

import {ProgBar,Lable} from './styledComponents';

const ProgressBar =  observer((props) => {
  const {
    totalQuestions,
    questionNumber
  } = props;
  let percent;
  
  if(questionNumber!==0)
       percent = Math.abs(questionNumber/totalQuestions);
  return <ProgBar>
      <Lable>{`${questionNumber} / ${totalQuestions}`}</Lable>
     <Line percent={`${percent*100}`} strokeWidth="4" strokeColor="#D3D3D3" />
  </ProgBar>
});

export default ProgressBar