import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-6">
        <div className="w-[95%] h-[650px] rounded-md bg-yellow-100 shadow-lg shadow-yellow-200"></div>
      </div>
    </>
  );
};

export default Home;
