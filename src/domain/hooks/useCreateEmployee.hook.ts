import { useMutation } from "@tanstack/react-query";
import { CreateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = (handleOnSuccess: () => void) => {
  return useMutation({
    mutationFn: (params: CreateEmployeeParams) =>
      service.createEmployee(params),
    onSuccess() {
      handleOnSuccess();
    },
  });
};
