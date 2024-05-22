import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import {
  CreateEmployeeParams,
  DeleteEmployeeByIdParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees",
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: CreateEmployeeParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: UpdateEmployeeParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const {id, ...employeeDetails} = params;
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(employeeDetails),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(
    params: DeleteEmployeeByIdParams,
  ): Promise<{
    status: "success" | "error",
    message: string
  } | undefined> {
    try {
      const {id} = params;
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (response.status !== 200) {
        return undefined;
      }
      const json = await response.json();
      const data = json["data"];
      return data;
    } catch (exception) {
      return undefined;
    }
  }
}
