function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
