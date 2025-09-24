import Spinner from "./Spinner";

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <div className="flex flex-col items-center justify-center">
      <Spinner isBig />
      <h2 className="mt-8 text-2xl font-semibold text-primaryText">
        Loading...
      </h2>
    </div>
  </div>
);

export default LoadingScreen;
