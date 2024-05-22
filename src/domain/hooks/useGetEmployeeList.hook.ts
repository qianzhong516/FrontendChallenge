import { useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"],
    queryFn: () => service.getEmployeeList(),
    gcTime: 24 * 60 * 60 * 1000,
  });
};
