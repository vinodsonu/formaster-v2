import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
export default function withToggle(WrappedComponent) {
   @observer
   class EnhancedComponent extends React.Component {
      @observable toggleStatus
      constructor(props) {
         super(props)
         this.toggleStatus = false
      }

      onToggle = () => {
         this.toggleStatus = !this.toggleStatus
      }

      render() {
         return (
            <WrappedComponent
               onToggle={this.onToggle}
               toggleStatus={this.toggleStatus}
               {...this.props}
            />
         )
      }
   }

   return EnhancedComponent
}
