interface IProps {



}

const ErrorComponent=({}:IProps)=> {
  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl  bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#FF5A5F]"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-[#1F2937]">
          Something went wrong
        </h2>

        <p className="mb-6 text-sm leading-6 text-[#6B7280]">
          We couldn&apos;t load the doctor information.
          Please try again later.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-app-main px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorComponent