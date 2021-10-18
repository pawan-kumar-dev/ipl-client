import Loader from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div
      style={{ height: 500, width: 500, margin: "20px auto" }}
      className="flex justify-center align-center"
    >
      <Loader
        type="Circles"
        color="#6c2bd9"
        height={100}
        width={100}
        timeout={300000} //3 secs
      />
    </div>
  );
};

export default LoaderComponent;
