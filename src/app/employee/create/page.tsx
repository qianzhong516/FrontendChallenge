"use client";

import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import { CreateEmployeeParams } from "@/domain/params/employee.param";
import { useState } from "react";

export default function CreateEmployeePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  // TODO: redirect to listing
  const { isError, isPending, isSuccess, error, mutate } =
    useCreateEmployee(resetForm);
  const canSubmit = name && age && salary;

  const handleCreateEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    mutate(Object.fromEntries(formData) as unknown as CreateEmployeeParams);
  };

  function resetForm() {
    setName("");
    setAge(0);
    setSalary(0);
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1 className="text-lg my-6">Create Employee</h1>
      {isPending ? (
        <p>Creating employee...</p>
      ) : isError ? (
        <div>Something went wrong: {error.message}</div>
      ) : isSuccess ? (
        <div>Employee created!</div>
      ) : null}
      <form className="flex flex-col gap-y-3" onSubmit={handleCreateEmployee}>
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
        <input type="submit" value="Submit" disabled={!canSubmit} />
      </form>
    </main>
  );
}
