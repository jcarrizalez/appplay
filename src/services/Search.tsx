import React, {useRef, useState, useEffect, useCallback} from 'react'
import Service from './Service'
import {SEARCH} from '~/endpoints'

export default class Search extends Service
{
  async getAllByText(text)
  {
    if(this.isRunning('getAllByText')) return

    this.setRunning('getAllByText')

    let cast = await SEARCH('cast', text)
    let director = await SEARCH('director', text)
    let content = await SEARCH('content', text)

    this.setRunning('getAllByText')

    return {
      text,
      cast,
      director,
      content
    }
  }
}
