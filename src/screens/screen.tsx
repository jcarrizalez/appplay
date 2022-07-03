import React, {useRef, useState, useEffect, useCallback} from 'react'

export default class Screen extends React.Component {

  protected route

  protected theme
  
  constructor(props)
  {
    super(props)

    this.theme = props.theme
    this.route = props.route
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {

  }

  componentDidMount()
  {

  }

  componentWillUnmount()
  {

  }
  
  render()
  {
    return null
  }
}
