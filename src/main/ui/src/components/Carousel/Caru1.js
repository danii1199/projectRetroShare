import Carousel from "react-material-ui-carousel";
import { useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from "react";
import Item from "./Item";

const Caru1 = () => {
  const [autoPlay, setAutoplay] = useState(true);
  const [animation, setAnimation] = useState("fade");
  const [indicators, setIndicators] = useState(true);

  useState(false);

  const handleAutoPlay = () => {
    setAutoplay(autoPlay);
  };

  const handleAnimation = () => {
    setAnimation(animation);
  };

  const handleIndicators = () => {
    setIndicators(indicators);
  };

  const { products } = useContext(ProductsContext);

  return (
    <div style={{ marginTop: "50px", color: "#494949" }}>
      <Carousel
        className="Example"
        autoPlay={handleAutoPlay}
        animation={handleAnimation}
        indicators={handleIndicators}
        
        next={(now, previous) =>
          console.log(
            `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        prev={(now, previous) =>
          console.log(
            `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        onChange={(now, previous) =>
          console.log(
            `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
      >
        {products.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Caru1;
