"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeById({ id: Number(employeeId) });

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      {isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <span>loading</span>
        </div>
      )}
      {!employee && !isLoading && isError && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
      {employee && <EmployeeCard employee={employee} />}
      {employee && (
        <Link
          className="border px-2 py-1 rounded-md"
          href={`/employee/${employee.id}/edit`}
        >
          Edit
        </Link>
      )}
    </main>
  );
}
