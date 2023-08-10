import React from "react";

import SearchHeader from "../Components/SearchHeader";
import Weatherscreen from "../Components/Weatherscreen";
import Forecast from "../Components/Forecast";
import AirCondition from "../Components/AirCondition";
import Sidebar from "../Components/Sidebar";
function Home() {
  return (
    <div className="container">
      <div className="wraper">
        <main>
          <SearchHeader />
          {/* <Weatherscreen /> */}
          {/* <Forecast /> */}
          {/* <AirCondition /> */}
        </main>
        {/* <Sidebar /> */}
      </div>
    </div>
  );
}

export default Home;
