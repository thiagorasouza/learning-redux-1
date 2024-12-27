import { Action, configureStore } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialCounterState: CounterState = {
  value: 0,
}

function counterReducer(state: CounterState = initialCounterState, action: Action) {
  switch (action.type) {
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
