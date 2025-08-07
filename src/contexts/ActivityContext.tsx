import { createContext, useReducer } from "react"
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer"

type ActivityContextProps = {
  state: ActivityState
  dispatch: React.Dispatch<ActivityActions>
}
type ActivityProviderProps = {
  children: React.ReactNode
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export default function ActivityProvider({children}:ActivityProviderProps) {

  const [ state, dispatch ] = useReducer(activityReducer, initialState)

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  )
}