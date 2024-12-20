import { memo } from 'react'

interface QueryButtonProps {
  onClick: () => void
  loading: boolean
  label: string
}

function QueryButton({ onClick, loading, label }: QueryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold transition 
      ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  )
}

export default memo(QueryButton)
