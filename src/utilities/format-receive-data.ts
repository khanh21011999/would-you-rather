import { UserI } from "../interface/interface";

export const formatUser = (users: Object) => {
  return Object.entries(users).map((item: any, index: number) => {
    return { ...item[1], username: item[0] };
  });
};
