import { Center, Flex, Title } from "@mantine/core";

function Winner(props) {
  return (
    <Flex
      sx={{ height: "100vh", width: "100vw", background: props.background }}
      align="center"
    >
      <Center sx={{ height: "100vh", width: "100vw" }}>
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
            }}
          >
            {props.prefix}
            {item}
            {props.suffix}
          </Title>
        ))}
      </Center>
    </Flex>
  );
}

export default Winner;
