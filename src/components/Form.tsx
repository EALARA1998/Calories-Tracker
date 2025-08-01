import { useEffect, useState, type Dispatch } from "react";
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
}

export default function Form({dispatch,state}:FormProps) {

  const initialState = {
    id: "",
    category: 1,
    name: "",
    calories: 0
  }

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(()=>{
    if(state.activeId){
      const selectedActivity = state.activities.filter(stateActivity => state.activeId === stateActivity.id)[0]
      setActivity(selectedActivity)
    }
  },[state.activeId])

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const isNumberField = ["category","calories"].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  function isValidActivity() {
    const { name, calories } = activity
    return !(name.trim() !== "" && calories > 0)
  }

  return (
    <>
      <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={e=>{
          e.preventDefault()
          dispatch( { type: "save-activity", payload: {newActivity: {...activity, id: uuidv4()}}} )
          setActivity(initialState)
        }}>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-bold" htmlFor="category">Categoria:</label>
          <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" value={activity.category} onChange={handleChange}>
            {categories.map(category =>
              <option key={category.id} value={category.id}>{category.name}</option>
            )}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-bold" htmlFor="name">Actividad:</label>
          <input className="border border-slate-300 p-2 rounded-lg" type="text" id="name" placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bici" value={activity.name} onChange={handleChange}/>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-bold" htmlFor="calories">Calorias:</label>
          <input className="border border-slate-300 p-2 rounded-lg" type="text" id="calories" placeholder="Calorias. ej. 300 o 500" value={activity.calories} onChange={handleChange}/>
        </div>
        <input className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" type="submit" value={`Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`} disabled={isValidActivity()}/>
      </form>
    </>
  )
}