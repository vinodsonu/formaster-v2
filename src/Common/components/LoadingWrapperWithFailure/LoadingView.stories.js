import React from 'react';
import { withKnobs,color } from '@storybook/addon-knobs';

import '../../../styles/tailwind.css'
import LoadingView from './LoadingView'

export default {
   component: LoadingView,
   title: 'Common/LoadingView'
}

export const defaultView = () => <LoadingView />

export const LoadingViewWithCustomColor = () => <LoadingView fill = {color('color','blue')}/>

LoadingViewWithCustomColor.story = {
   decorators:[withKnobs]
}