import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";


export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivity must be used within a ActivityProvider");
  }
  return context;
};
//const { state, dispatch } = useActivity()