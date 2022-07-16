import React from 'react'
import PropTypes from 'prop-types'
import styled from '~/components';
import View from './View'

function Theme({theme})
{
  return (
    <View theme={theme}/>
  )
}

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default styled(Theme)