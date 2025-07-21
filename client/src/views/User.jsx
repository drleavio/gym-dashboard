import React from 'react'
import withAuthProtection from '../controllers/withAuthProtection'

const User = () => {
  return (
    <div>User</div>
  )
}

export default withAuthProtection(User)