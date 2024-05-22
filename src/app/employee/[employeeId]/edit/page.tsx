"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployee } from "@/domain/hooks/useUpdateEmployee.hook";
import { UpdateEmployeeParams } from "@/domain/params/employee.param";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const { data: employee } = useGetEmployeeById({ id: Number(employeeId) });
  const { isError, isPending, isSuccess, error, mutate } = useUpdateEmployee(
    () => redirect("/"),
  );

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const canSubmit = name && age && salary;

  useEffect(() => {
    if (employee) {
      setName(employee.employee_name);
      setAge(employee.employee_age);
      setSalary(employee.employee_salary);
    }
  }, [employee]);

  const handleUpdateEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employee) return;
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("id", "" + employee.id);
    mutate(Object.fromEntries(formData) as unknown as UpdateEmployeeParams);
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1>Edit Employee</h1>
      {isPending ? (
        <p>Updating employee...</p>
      ) : isError ? (
        <div>Something went wrong: {error.message}</div>
      ) : isSuccess ? (
        <div>Employee updated!</div>
      ) : null}
      <form className="flex flex-col gap-y-3" onSubmit={handleUpdateEmployee}>
        <div>
          {/* TODO: add form validation */}
          <label htmlFor="employee_name">Employee Name: </label>
          <input
            type="text"
            name="employee_name"
            id="employee_name"
            className="text-black p-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employee_age">Employee Age: </label>
          <input
            type="number"
            min={1}
            max={100}
            name="employee_age"
            id="employee_age"
            className="text-black p-1"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employee_salary">Employee Salary: </label>
          <input
            type="number"
            min={1}
            name="employee_salary"
            id="employee_salary"
            className="text-black p-1"
            value={salary}
            onChange={(e) => setSalary(+e.target.value)}
          />
        </div>
        <input type="submit" value="Update" disabled={!canSubmit} />
      </form>
    </main>
  );
}
