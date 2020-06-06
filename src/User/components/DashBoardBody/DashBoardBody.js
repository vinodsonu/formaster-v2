import React from 'react'
import {observer} from 'mobx-react'

import FormCards from '../FormCards';
import Paginator from '../../../Common/components/Paginator';

import { DashBoard, FormSection } from './styledComponents.js'

@observer
class DashBoardBody extends React.Component {
   render() {
      const {
         forms,
         onClickForm,
         currentPage,
         totalPagesCount,
         getNextForms,
         getPreviousForms
      } = this.props
      return (
         <DashBoard>
            <FormSection>
               <FormCards forms={forms} onClickForm={onClickForm} />
            </FormSection>
            <Paginator
               currentPage = {currentPage}
               totalPagesCount = {totalPagesCount}
               getNextForms = {getNextForms}
               getPreviousForms = {getPreviousForms}
            />
         </DashBoard>
      )
   }
}

export { DashBoardBody }
