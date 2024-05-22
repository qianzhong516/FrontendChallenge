import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (param: GetEmployeeByIdParams) => {
  return useQuery({
    queryKey: ["getEmployeeById"],
    queryFn: () => service.getEmployeeById(param),
    retry: 3,
  });
};
