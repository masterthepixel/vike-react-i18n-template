import React, { useState } from "react"

export { Counter }

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="inline-flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <span className="text-lg font-medium text-gray-700">
        Count: <span className="text-2xl font-bold text-blue-600">{count}</span>
      </span>
      <div className="flex space-x-2">
        <button 
          onClick={() => setCount((count) => count - 1)}
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          -
        </button>
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          +
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
