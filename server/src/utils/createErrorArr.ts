import { UserError } from "../object-types/UserError";

function createErrorArr(field: string, message: string): UserError[] {
  return [{ field, message }];
}

export default createErrorArr;
