import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

function UserSelectorItem({ id, name, imageURL, onClick }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    try {
      setImage(require("../" + imageURL))
    }
    catch {}
  }, [imageURL]);

  return (
    <Dropdown.Item
      href="#"
      className="user_selector-dropdown_item"
      onClick={(e) => {onClick(e, id)}}
    >
      <img src={image !== '' ? image : ''} alt="" /> {name}
    </Dropdown.Item>
  )
}
export default UserSelectorItem