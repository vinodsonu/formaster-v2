import React from 'react'
import {observer} from 'mobx-react'

import FormCards from '../FormCards';


import { DashBoard, FormSection } from './styledComponents.js'

@observer
class DashBoardBody extends React.Component {
   render() {
      const {
         forms,
         onClickForm
      } = this.props
      return (
         <DashBoard>
            <FormSection>
               <FormCards forms={forms} onClickForm={onClickForm} />
            </FormSection>
         </DashBoard>
      )
   }
}

export { DashBoardBody }
