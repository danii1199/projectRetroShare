import Carousel from "react-material-ui-carousel";
import { useState } from "react";
import Item from "./Item";

import { Grid } from "@material-ui/core";

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

  const items = [
    {
      src: process.env.PUBLIC_URL + "/juegos.jpg",
      altText: "Juegos",
      caption: "Juegos",
      to: "videogames",
    },
    {
      src: process.env.PUBLIC_URL + "/consolas.jpg",
      altText: "Consolas",
      caption: "Consolas",
      to: "gameconsole",
    },
    {
      src: process.env.PUBLIC_URL + "/vinilos.jpg",
      altText: "Vinilos",
      caption: "Vinilos",
      to: "Vinyl",
    },
    {
      src: process.env.PUBLIC_URL + "/tocadiscos.jpg",
      altText: "Tocadiscos",
      caption: "Tocadiscos",
      to: "rplayer",
    },
  ];

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
        {items.map((item, i) => (
          <Grid>
            <Item key={i} item={item} />
          </Grid>
        ))}
      </Carousel>
    </div>
  );
};

export default Caru1;
