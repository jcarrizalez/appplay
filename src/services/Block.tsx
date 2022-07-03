import React, {useRef, useState, useEffect, useCallback} from 'react'
import Service from './Service'
import {BLOCK_ID} from '~/endpoints'
import {navigator} from 'lib'

export default class Block extends Service
{
  async findById(id, params)
  {
    if(this.isRunning('find')) return

    this.setRunning('find')

    let response = await BLOCK_ID(id, params)

    this.setRunning('find')

    return response ?? null
  }
}
