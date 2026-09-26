import { useEffect, useState } from "react"

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")

  const [editingEmployee, setEditingEmployee] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")

  // Get all employees
  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error fetching employees:", error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  // Start editing
  const handleEdit = (employee) => {
    setEditingEmployee(employee)

    setName(employee.name)
    setEmail(employee.email)
    setDepartment(employee.department)
  }

  // Update employee
  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${editingEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            department
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert("Employee updated successfully!")

        setEditingEmployee(null)
        setName("")
        setEmail("")
        setDepartment("")

        fetchEmployees()
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log("Update error:", error)
      alert("Failed to update employee")
    }
  }

  // Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE"
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert("Employee deleted successfully!")

        fetchEmployees()
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log("Delete error:", error)
      alert("Failed to delete employee")
    }
  }

  // Get unique departments
  const departments = [
    ...new Set(employees.map((employee) => employee.department))
  ]

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  if (loading) {
    return (
      <p className="p-8 text-gray-600">
        Loading employees...
      </p>
    )
  }

  return (
    <div className="p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Employee List
        </h1>

        {/* Total Employees Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <p className="text-gray-500 text-sm">
            Total Employees
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-1">
            {employees.length}
          </p>

        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by name, email or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          >

            <option value="All">
              All Departments
            </option>

            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}

          </select>

        </div>

        {/* Edit Employee */}
        {editingEmployee && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Edit Employee
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />

              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Update Employee
                </button>

                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {filteredEmployees.length === 0 ? (

            <p className="p-6 text-gray-600">
              No employees found.
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="bg-gray-800 text-white">

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Department
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((employee) => (

                  <tr
                    key={employee._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium text-gray-800">
                      {employee.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {employee.email}
                    </td>

                    <td className="p-4 text-gray-600">
                      {employee.department}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => handleEdit(employee)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  )
}

export default EmployeeList