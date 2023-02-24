import { Center, Flex, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import hourglassAnimation from "../hourglass.json";
import confettiAnimation from "../confetti.json";

function Winner(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), props.duration * 1000);
  }, [ready, props.duration]);

  return ready ? (
    <Flex
      sx={{
        height: "100vh",
        width: "100vw",
        background: `url(${props.background})`,
        backgroundSize: "cover",
      }}
      align="center"
    >
      <Center sx={{ height: "100vh", width: "100vw" }}>
        {props.celebrate && (
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            style={{ position: "absolute" }}
          />
        )}
        {props.winner.map((item, i) => (
          <Title
            color={props.color}
            order={1}
            key={i}
            align="center"
            sx={{
              fontSize: "8vh",
              maxWidth: "80vw",
              margin: "0 auto",
              textShadow: "0px 0px 20px rgba(0,0,0,0.3)",
            }}
          >
            {props.prefix}
            {item}
            {props.suffix}
          </Title>
        ))}
      </Center>
    </Flex>
  ) : (
    <div
      style={{
        background: `url(${props.background})`,
        backgroundSize: "cover",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Lottie
        animationData={hourglassAnimation}
        loop={true}
        style={{
          height: `${props.loaderSize}%`,
          width: `${props.loaderSize}%`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export default Winner;
