import React from "react";

interface ErrorScreenProps {
  message?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = "დაფიქსირდა შეცდომა!",
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey">
    <div className="flex min-h-[32rem] min-w-[40rem] flex-col items-center justify-center rounded-3xl border-2 border-red-400 bg-white px-24 py-20 shadow-2xl">
      <svg
        width="120"
        height="120"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="mb-12 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="mb-6 text-5xl font-extrabold text-red-600">Error</h2>
      <p className="mb-12 max-w-[30rem] text-center text-2xl text-secondaryText">
        {message}
      </p>
      <button
        className="mt-2 w-72 rounded-2xl bg-buttonColor py-5 text-2xl font-bold text-white shadow-lg transition hover:bg-red-600"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorScreen;
