import { TaskFunction } from "gulp";
export function desc(fn: TaskFunction, description: string) {
  fn.description = description;
}
