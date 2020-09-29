import React, { useState } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserSelectorItem from './UserSelectorItem'

function UserSelector({ onChoose }) {
  const users = useSelector(state => state.users)

  const [activeName, setActiveName] = useState('Select User')
  const [variant, setVariant] = useState('outline-secondary')

  const onItemClick = (e, id) => {
    setActiveName(users[id].name)
    setVariant('outline-dark')
    onChoose(e, id)
  }

  return (
    <DropdownButton
      className="user_selector-dropdown"
      variant={variant}
      title={activeName}
    >
      {Object.keys(users).map((id) => (
          <UserSelectorItem
            key={id}
            id={id}
            name={users[id].name}
            imageURL={users[id].avatarURL}
            styleWidth={DropdownButton}
            onClick={onItemClick}
          />
      ))}
    </DropdownButton>
  )
}

export default UserSelector