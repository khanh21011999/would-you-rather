export interface UserI{
  id: string | number,
  name:string,
  avatarURL:string,
  answers?:any,
  questions?:any,

}
type author = string | UserI[]
export interface questionI{
    id:string|number,
    author:any,
    timestamp:number,
    optionOne:any,
    optionTwo:any,

}
export interface LocationParams {
  pathname: string;
  state: any;
  search: string;
  hash: string;
  key: string;
}
export interface FormattedQuestionI{
  author:Array<any>
  id:string
  optionOne:Object
  optionTwo: Object
  selectedValue?:'optionOne'| 'optionTwo',
  timestamp:number,
  username:string
}