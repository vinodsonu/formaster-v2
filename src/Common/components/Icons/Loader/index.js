import React, { Component } from 'react';
import ReactLoading from 'react-loading';


import SvgComponent from '../../SvgComponent'
import SvgFile from './SvgFile'

class Loader extends Component {
   render() {
      return <ReactLoading type={"spinningBubbles"} color={"grey"} height={100} width={100} />
   }
}

export default Loader

