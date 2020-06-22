import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import '../../../../styles/tailwind.css'

import {cardTitleTypo} from '../../../styleGuide/Typos';

import PrimaryButton from '../../PrimaryButton'
import './Card.css'
import Card from '.';




export default {
    component: Card,
    title: 'Common/components/common/Card'
 }
 
 export const defaultView = () => <Card>
                                <PrimaryButton
                                    displayText={"button"}
                                />
                                </Card>

export const customClassName = () => <Card
                                        className="custom"
                                    >
                                    <PrimaryButton
                                        displayText={"button"}
                                    />
                                    </Card>

export const customTitleTypo = () => <Card
                                        title="card"
                                        titleTypo={cardTitleTypo}
                                    >
                                    <PrimaryButton
                                        displayText={"button"}
                                    />
                                    </Card>
export const clcikableCard = () => <Card
                                        title="card"
                                        titleTypo={cardTitleTypo}
                                        onClick={()=>{}}
                                        >
                                        <PrimaryButton
                                        displayText={"button"}
                                        />
                                        </Card>