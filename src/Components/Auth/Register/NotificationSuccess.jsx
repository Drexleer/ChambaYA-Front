const NotificationSuccess = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-500 w-80 rounded-lg shadow-xl flex flex-col items-center p-6 relative">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">¡Registro Exitoso!</h2>
          <p className="text-white text-sm">
            Serás redirigido al login en unos momentos...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSuccess;
