import React from "react";
import Cards from "./Cards";
import { productData } from "./data";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";

const RoomList = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <div style={{ textAlign: "center" }}>
          {productData.slice(0, 20).map((e, i) => (
            <div style={{ display: "inline-block", margin: "10px" }} key={i}>
              <Cards
                id={e.id}
                title={e.title}
                desc={e.description}
                image={e.image}
                category={e.category}
                rating={e.rating.rate}
                price={e.price}
              />
            </div>
          ))}
        </div>
      </Box>
      <Footer/>
    </Box>
  );
};

export default RoomList;
