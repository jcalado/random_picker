import {
  ActionIcon,
  Alert,
  Button,
  HoverCard,
  Center,
  Flex,
  Group,
  Stack,
  ThemeIcon,
  Title,
  List,
} from "@mantine/core";
import { IconHelp, IconCircleCheck, IconNews, IconInfoCircleFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "./App.css";
import Configuration from "./components/Configuration";
import Winner from "./components/Winner";

function App() {
  // const [items, setItems] = useState([]);
  // const [winner, setWinner] = useState();
  // const [prefix, setPrefix] = useState();
  // const [suffix, setSuffix] = useState();
  // const [amount, setAmount] = useState(1);
  // const [duration, setDuration] = useState(5);
  // const [buttonLabel, setButtonLabel] = useState("Sortear");
  // const [background, setBackground] = useState("");
  // const [color, setColor] = useState("");
  // const [celebrate, setCelebrate] = useState(false);
  // const [loaderSize, setLoaderSize] = useState(50);
  // const [removeName, setRemoveName] = useState(false);

  const startState = {
    items: [],
    winner: "",
    prefix: "",
    suffix: "",
    amount: 1,
    buttonLabel: "Sortear",
    color: "#000000",
    background: "",
    duration: 5,
    celebrate: false,
    removeName: false,
    loaderSize: 50,
  };
  const [state, setState] = useState(startState);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    console.log("use effect");
    document.removeEventListener("keydown", (event) => _handleKeyDown);
    document.addEventListener("keydown", (event) => _handleKeyDown);
  }, [state]);

  const handleSubmit = (event) => {
    pickWinner(state.items);
  };

  const _handleKeyDown = (event) => {
    console.log(event);
    if (event.keyCode === 32 && state.items.length > 0) {
      console.log("Escolher outro vencedor");
      pickWinner(state.items);
    }
  };

  const handleUpdateList = (values) => {
    let newState = {
      items: values.itens.split(/\r?\n/),
      winner: "",
      prefix: values.prefix,
      suffix: values.suffix,
      amount: values.amount,
      buttonLabel: values.button_label,
      color: values.color,
      background: values.background,
      duration: values.duration,
      celebrate: values.celebrate,
      removeName: values.removeName,
      loaderSize: values.loaderSize,
    };

    setState(newState);

    localStorage.setItem("state", JSON.stringify(newState));
  };

  const pickWinner = (items) => {
    let win = items.sort((a, b) => 0.5 - Math.random());
    let winners = win.slice(0, state.amount);

    if (state.removeName) {
      setState({
        ...state,
        winner: winners,
        items: items.filter((el) => !winners.includes(el)),
      });
    } else {
      // Select x amount winners from items
      setState({ ...state, winner: winners });
    }
  };

  const reset = () => {
    localStorage.removeItem("state");
    setState(startState);
  };

  return state.winner ? (
    <Winner
      winner={state.winner}
      background={state.background}
      prefix={state.prefix}
      suffix={state.suffix}
      color={state.color}
      duration={state.duration}
      celebrate={state.celebrate}
      loaderSize={state.loaderSize}
    />
  ) : (
    <Flex
      align="center"
      justify="center"
      sx={{
        height: "100vh",
        width: "100vw",
        background: `url(${state.background})`,
        backgroundSize: "cover",
      }}
    >
      <Center maw="80vw">
        {state && state.items && state.items.length === 0 ? (
          <Stack>
            <Flex align={"center"} justify="space-between">
            <Title order={1}>Sorteios & Giveaways 🎲</Title>
            <HoverCard width={400} shadow="md">
              <HoverCard.Target>
                <ActionIcon>
                  <IconInfoCircleFilled />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Title order={4} style={{marginBottom: 10}}>Novidades</Title>
                <List icon={<IconCircleCheck size={16} />}>
                  <List.Item>Guardar configurações;</List.Item>
                  <List.Item>Configurar tamanho da animação</List.Item>
                </List>
              </HoverCard.Dropdown>
            </HoverCard>
            </Flex>

            <Configuration
              items={state.items}
              winner={state.winner}
              prefix={state.prefix}
              suffix={state.suffix}
              amount={state.amount}
              handleSubmit={handleSubmit}
              handleUpdateList={handleUpdateList}
              reset={reset}
            ></Configuration>
            {state && state.items && state.items.length > 0 && (
              <Alert title="Sorteio configurado!" color="green">
                Foram recolhidas <strong>{state.items.length}</strong> entradas.{" "}
                <br />
                Serão sorteados {state.amount} vencedores.
                <br /> Cada entrada terá o aspeto:
                <code>
                  {state.prefix}Valor da Entrada{state.suffix}
                </code>
              </Alert>
            )}
          </Stack>
        ) : (
          <Stack>
            <Group position="center" mt="xl">
              <Button
                color="green"
                size="xl"
                onClick={() => handleSubmit()}
                disabled={state && state.items && state.items.length === 0}
              >
                {state.buttonLabel}
              </Button>
            </Group>
          </Stack>
        )}
      </Center>
    </Flex>
  );
}

export default App;
