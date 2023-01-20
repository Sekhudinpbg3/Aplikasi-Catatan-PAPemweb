const Textloading = ({ loading }) => {
  return (
    <div className={loading ? "loader-loading" : "hidden"}>
      <div className="h-10 w-10 grid-center-xy">
        <p className="font-semibold text-blue-700 dark:text-blue-800 animate-pulse">Loading</p>
      </div>
    </div>
  );
};

export default Textloading;
