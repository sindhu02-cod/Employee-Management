
import { useState } from "react"

function AddEmployee() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const employee = {
      name,
      email,
      department
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert("Employee added successfully!")

        setName("")
        setEmail("")
        setDepartment("")
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log("Error:", error)
      alert("Failed to add employee")
    }
  }

  return (
    <div className="bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Name
            </label>

            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>

            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            Add Employee
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddEmployee