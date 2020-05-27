import React from "react";

import Loader from "../Icons/Loader";

import { LoadingViewContainer } from "./styledComponents";

class LoadingView extends React.Component {
  render() {
    return (
      <LoadingViewContainer className = 'w-full'>
        <Loader {...this.props} />
      </LoadingViewContainer>
    );
  }
}

export default LoadingView;
