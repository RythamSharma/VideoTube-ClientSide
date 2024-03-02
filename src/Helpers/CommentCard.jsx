import React from 'react'

function CommentCard(props) {
  return (
    <div className='text-white'>
      {props.content}
    </div>
  )
}

export default CommentCard
