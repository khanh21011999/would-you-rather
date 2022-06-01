export interface UserI{
  id: string | number,
  name:string,
  avatarURL:string,
  answers:any,
  questions:string[],

}
export interface questionI{
    id:string|number,
    author:string,
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
