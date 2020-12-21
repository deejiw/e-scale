import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'

const ShoppingList = () => {
  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItems())
  }, [])

  // _id is parsed as id here
  const onDeleteClick = id => {
    dispatch(deleteItem(id))
  }

  return (
    <Container>
      {isAuthenticated ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => onDeleteClick(_id)}>
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : null}
    </Container>
  )
}

export default ShoppingList
