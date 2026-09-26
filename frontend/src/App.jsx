import AddEmployee from "./employees/AddEmployee"
import EmployeeList from "./employees/EmployeeList"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Header */}
      <div className="bg-gray-800 text-white py-6">
        <h1 className="text-3xl font-bold text-center">
          Employee Management System
        </h1>
      </div>

      {/* Add Employee */}
      <AddEmployee />

      {/* Employee List */}
      <EmployeeList />

    </div>
  )
}

export default App