import { Alert, Button, Center, Flex, Group, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import "./App.css";
import Configuration from "./components/Configuration";
import Winner from "./components/Winner";

function App() {
  const [items, setItems] = useState([]);
  const [winner, setWinner] = useState();
  const [prefix, setPrefix] = useState();
  const [suffix, setSuffix] = useState();
  const [amount, setAmount] = useState(1);
  const [duration, setDuration] = useState(5);
  const [buttonLabel, setButtonLabel] = useState("Sortear");
  const [background, setBackground] = useState("");
  const [color, setColor] = useState("");
  const [celebrate, setCelebrate] = useState(false);



  useEffect(() => {
    document.addEventListener("keydown", _handleKeyDown);
  }, [items]);

  const handleSubmit = (event) => {
    pickWinner(items);
  };

  const handleUpdateList = (values) => {
    console.log(values.itens);
    setItems(values.itens.split(/\r?\n/));
    setWinner("");
    setPrefix(values.prefix);
    setSuffix(values.suffix);
    setAmount(values.amount);
    setButtonLabel(values.button_label);
    setColor(values.color);
    setBackground(values.background);
    setDuration(values.duration);
    setCelebrate(values.celebrate);
  };

  const _handleKeyDown = (event) => {
    console.log(event);
    if (event.keyCode === 32 && items.length > 0) {
      pickWinner(items);
    }
  };

  const pickWinner = (items) => {
    let win = items.sort((a, b) => 0.5 - Math.random());

    setWinner(win.slice(0, amount));
  };

  return (
    winner ? <Winner winner={winner} background={background} prefix={prefix} suffix={suffix} color={color} duration={duration} celebrate={celebrate}/> : 
    <Flex align="center" justify="center" sx={{height: '100vh', width: '100vw', background: `url(${background})`, backgroundSize: 'cover'}}>
      <Center maw="80vw">
        {items.length === 0 ? (
          <Stack>
            <Title order={1}>Sorteio 🎲</Title>
          <Configuration
            items={items}
            winner={winner}
            prefix={prefix}
            suffix={suffix}
            amount={amount}
            handleSubmit={handleSubmit}
            handleUpdateList={handleUpdateList}
          ></Configuration>
          {items.length > 0 && (
            <Alert title="Sorteio configurado!" color="green">
              Foram recolhidas <strong>{items.length}</strong> entradas.{" "}
              <br />
              Serão sorteados {amount} vencedores.
              <br /> Cada entrada terá o aspeto:
              <code>
                {prefix}Valor da Entrada{suffix}
              </code>
            </Alert>
          )}</Stack>
        ) : (
          <Stack>
            <Group position="center" mt="xl">
            <Button
              color="green"
              size="xl"
              onClick={() => handleSubmit()}
              disabled={items.length === 0}
            >
              {buttonLabel}
            </Button>
            </Group>
          </Stack>
        )}
      </Center>
    </Flex>
  );
}

export default App;
