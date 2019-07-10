export enum UserRole {
  ROOT = "root",
  // 馆主
  MASTER = "master",
  // 教师
  COACH = "coach",
  // 学生
  STUDENT = "Student",
}

/**
 * 用户
 */
export interface IUser {
  id: number;
  role: UserRole[];
  // 用户姓名(第一次登陆的时候是微信姓名)
  nickname: string;
  // 微信ID
  union_id: string;
  // 创建时间
  timestamp: Date;
}
