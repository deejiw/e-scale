import { useRef, useEffect } from 'react'
export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const updateError = (
  errorType,
  state,
  error,
  prevError,
  isAuthenticated,
  setState,
  toggle
) => {
  if (error !== prevError) {
    // Check for register error
    if (error.id === errorType) {
      setState(prevState => ({ ...prevState, msg: error.msg.msg }))
    } else {
      setState({ msg: null })
    }
  }
  if (state.modal && isAuthenticated) {
    toggle()
  }
}
