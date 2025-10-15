const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 dark:border-primary-700 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-sm text-primary-600 dark:text-primary-400 animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;

