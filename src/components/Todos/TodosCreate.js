import React from 'react'
import TodosForm from './TodosForm'

export default function TodosCreate(props) {
  return (
    <article className='createTodos m-2 text-white justify-content-center'>
        <TodosForm
            setShowCreate={props.setShowCreate}
            getTodos={props.getTodos} />
    </article>
  )
}
