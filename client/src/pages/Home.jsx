import HomePageImage from "../components/HomePageImage";
import HomePageText from "../components/HomePageText";
import Navbar from "../components/Navbar";
import ProductCategory from "../components/ProductCategory";
import ProductDisplay from "../components/ProductDisplay";

const Home = () => {
  // const handleScrollToProductDisplay = () => {
  //   let element = document.getElementById("prod-display");
  //   element.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <>
      <Navbar />
      {/* <HomePageText
        handleScrollToProductDisplay={handleScrollToProductDisplay}
      /> */}
      <HomePageImage />
      <ProductCategory />
      <ProductDisplay />
      {/* <div id="prod-display">
        <ProductDisplay />
      </div> */}
    </>
  );
};

export default Home;
