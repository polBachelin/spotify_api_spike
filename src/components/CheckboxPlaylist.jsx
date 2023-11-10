import { Checkbox, WrapItem } from "@chakra-ui/react"
import React, { useState } from "react"

function CheckboxPlaylist({ playlist, index }) {
  const [selected, setSelected] = useState(false)

  const handleChange = (e) => {
    playlist.isChecked = e.target.checked
    setSelected(e.target.checked)
  }

  return (
    <WrapItem key={index} padding="5" borderWidth="1px">
      <Checkbox onChange={(e) => handleChange(e)} isChecked={selected}>
        {playlist.name}
      </Checkbox>
    </WrapItem>
  )
}

export default CheckboxPlaylist
