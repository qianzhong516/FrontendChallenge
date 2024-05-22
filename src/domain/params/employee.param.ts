import { z } from "zod";
import { EmployeeIdSchema, EmployeeSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;
export const DeleteEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type DeleteEmployeeByIdParams = z.infer<typeof DeleteEmployeeByIdSchema>;

export type UpdateEmployeeParams = z.infer<typeof EmployeeSchema>;

export const CreateEmployeeSchema = EmployeeSchema.omit({ id: true });
export type CreateEmployeeParams = z.infer<typeof CreateEmployeeSchema>;
