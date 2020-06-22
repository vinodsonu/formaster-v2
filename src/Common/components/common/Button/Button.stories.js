import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import '../../../../styles/tailwind.css'
import {ButtonTextTypo} from '../../../styleGuide/Typos'
import './button.css'

import {ButtonWrapper} from './styledComponents'
import Button from '.'



export default {
    component: Button,
    title: 'Common/components/common/Button'
 }

 export const defaultView = () => <Button text={"Button"}/>

 export const customClassName = () => <ButtonWrapper 
                                        text={"Button"}    
                                    />

 export const customButtonTextTypos = () => <Button 
                                        text={"Button"}
                                        textTypo = {ButtonTextTypo}    
                                    />

export const outlineButton = () => <Button 
                                        text={"Button"}
                                        textTypo = {ButtonTextTypo} 
                                        type="OUTLINE"   
                                    />
export const customValues = () => <Button 
                                        text={text('Button Text', 'Button')}
                                        textTypo = {ButtonTextTypo} 
                                        type={text('Button Type', 'FILLED')}  
                                        variant={text('Button Variant', 'OVAL')}
                                        className={text('Class Name', 'custom')}
                                        disabled={text("Button Disabled",false)}
                                    />
customValues.story = {
    decorators: [withKnobs]
}