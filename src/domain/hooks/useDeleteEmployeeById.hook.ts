import { useMutation } from "@tanstack/react-query";
import { DeleteEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = () => {
  return useMutation({
    mutationFn: (param: DeleteEmployeeByIdParams) =>
      service.deleteEmployeeById(param),
  });
};
