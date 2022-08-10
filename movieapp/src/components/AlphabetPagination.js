import React from 'react'

const AlphabetPagination = ({ letter, active, onChangeActive, index }) => {

  return (
    <span onClick={() => (onChangeActive(index))} id="oneLetter" className={active
      ? "letterActive" : "letterInactive"}>{letter}</span>
  )
}
export default AlphabetPagination
