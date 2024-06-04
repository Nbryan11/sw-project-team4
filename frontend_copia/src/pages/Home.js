import React from "react";
import win from "../assets/win.png"
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
    return(
        <div class=" bg-slate-200">
          <CategoryList/>
          <BannerProduct/>
          <HorizontalCardProduct category={"office"} heading={"Top's Office"}/>
          <HorizontalCardProduct category={"operating systems"} heading={"Top's windows"}/>

          <HorizontalCardProduct  category={"cybersecurity"} heading={"Top's windows"}/>

          <HorizontalCardProduct  category={"design"} heading={"Top's design"}/>

      </div>
    )
}

export default Home
