import type { Activity } from "../types"

export type ActivityState = {
  activities: Activity[],
  activeId: Activity["id"]
}
export type ActivityActions = 
  | { type: "save-activity", payload: { newActivity : Activity } }
  | { type: "delete-activity", payload: { id: Activity["id"] } }
  | { type: "set-activeId", payload: { id: Activity["id"] } }
  | { type: "restart-app" }

const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem("activities")
  return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
  activities: localStorageActivities(),
  activeId: ""
}
export const activityReducer : React.Reducer<ActivityState, ActivityActions> = (
  state: ActivityState = initialState,
  action: ActivityActions) => {
  switch (action.type) {
    case "save-activity": {
      let updatedActivities : Activity[] = []
      if (state.activeId) {
        updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
      }else{
        updatedActivities = [...state.activities, action.payload.newActivity]
      }
      return {
        ...state,
        activities: updatedActivities,
        activeId: ""
      }
      break;
    }
    case "delete-activity": {
      return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== action.payload.id),
        activeId: ""
      }
      break;
    }
    case "set-activeId": {
      return {
        ...state,
        activeId: action.payload.id
      }
      break;
    }
    case "restart-app": {
      return {
        activities: [],
        activeId: ""
      }
      break;
    }
    default:
      return state;
  }
}