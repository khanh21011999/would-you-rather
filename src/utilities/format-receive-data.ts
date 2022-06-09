import { useSelector } from "react-redux";
import { FormattedQuestionI, questionI, UserI } from "../interface/interface";
import { RootState } from "../redux/store";

export const formatUser = (users: Object) => {
  return Object.entries(users).map((item: any, index: number) => {
    return { ...item[1], username: item[0] };
  });
};
export function capitalizeFirstLetter(string: string) {
  if(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
}

export function getFormattedQuestion(data:any){
  return {
    
  }
	
}