import React from 'react'
// import {action} from "mobx";

function create(name) {
  const Base = React[name]
  return class extends Base {
    componentDidMount() {
      this.$isMounted = true
    }

    componentWillUnmount() {
      this.$isMounted = false
    }

    setState(...args) {
      if (this.$isMounted) super.setState(...args)
    }

    // FIXME
    // @action.bound
    forceUpdate() {
      if (this.$isMounted) super.forceUpdate()
      if (this.$isMounted === undefined) {
        if (this.forceUpdateTimer) clearTimeout(this.forceUpdateTimer)
        this.forceUpdateTimer = setTimeout(this.forceUpdate.bind(this))
      }
    }
  }
}

export const Component = create('Component')
export const PureComponent = create('PureComponent')
