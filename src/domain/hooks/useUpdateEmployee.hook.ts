import { useMutation } from "@tanstack/react-query";
import { UpdateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployee = (handleOnSuccess: () => void) => {
  return useMutation({
    mutationFn: (params: UpdateEmployeeParams) =>
      service.updateEmployeeById(params),
    onSuccess: handleOnSuccess
  });
};
