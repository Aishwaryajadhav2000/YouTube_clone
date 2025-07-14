import React from 'react'

export default function NotFound() {
  return (
   <div className="flex items-center justify-center min-h-screen bg-blue-200">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-lg">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-gray-700 mb-6 text-lg">
                    The page you are looking for is not here.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
                    Go Back to Home
                </button>
            </div>
        </div>
  )
}
