import {
  Checkbox,
  ColorInput,
  Textarea,
  TextInput,
  NumberInput,
  Stack,
  Button,
  Group,
  SimpleGrid,
  Paper,
  Slider,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";

function Configuration(props) {
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
  const state = JSON.parse(localStorage.getItem("state")) ?? startState;

  const form = useForm({
    initialValues: {
      itens: state.items.join("\n"),
      prefix: state.prefix,
      suffix: state.suffix,
      amount: state.amount,
      color: state.color,
      background: state.background,
      button_label: state.buttonLabel,
      duration: state.duration,
      celebrate: state.celebrate,
      removeName: state.removeName,
      loaderSize: state.loaderSize,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const handleReset = () => {
    form.setValues({
      itens: "",
      prefix: "",
      suffix: "",
      amount: 1,
      color: "#000000",
      background: "",
      button_label: "Sortear",
      duration: 5,
      celebrate: false,
      removeName: false,
      loaderSize: 50,
    });
    props.reset();
  };

  return (
    <Paper shadow="md" radius="md" p="xl">
      <Stack>
        <form
          onSubmit={form.onSubmit((values) => props.handleUpdateList(values))}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Textarea
            placeholder="Inserir lista de itens, um por linha"
            label="Itens"
            withAsterisk
            autosize
            maxRows={10}
            {...form.getInputProps("itens")}
          />
          <SimpleGrid cols={4}>
            <TextInput
              label="Prefixo"
              placeholder="Pode usar emojis, como 🎉"
              {...form.getInputProps("prefix")}
            />
            <TextInput
              label="Sufixo"
              placeholder="Pode usar emojis, como 🥳"
              {...form.getInputProps("suffix")}
            />
          </SimpleGrid>

          <h3>Design</h3>
          <SimpleGrid cols={4}>
            <TextInput
              label="Imagem de fundo"
              placeholder="URL da imagem"
              {...form.getInputProps("background")}
            />
            <ColorInput
              label="Cor do texto do vencedor"
              placeholder=""
              {...form.getInputProps("color")}
            />
            <TextInput
              value={props.amount}
              placeholder=""
              label="Texto do botão sortear"
              withAsterisk
              {...form.getInputProps("button_label")}
            />
            <div>
              <Text fw={500} fz="sm" sx={{ marginBottom: "12px" }}>
                Tamanho da animação
              </Text>
              <Slider
                step={5}
                max={100}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 25, label: "25%" },
                  { value: 50, label: "50%" },
                  { value: 75, label: "75%" },
                  { value: 100, label: "100%" },
                ]}
                {...form.getInputProps("loaderSize")}
              />
            </div>
          </SimpleGrid>

          <h3>Comportamento</h3>
          <SimpleGrid cols={4}>
            <NumberInput
              value={props.duration}
              placeholder="Em segundos"
              label="Duração do sorteio (segundos)"
              withAsterisk
              {...form.getInputProps("duration")}
            />
            <NumberInput
              value={props.amount}
              placeholder=""
              label="Vencedores"
              withAsterisk
              {...form.getInputProps("amount")}
            />
            <Checkbox
              sx={{ marginTop: "32px" }}
              label="Celebrar! 🎊"
              size="md"
              {...form.getInputProps("celebrate", { type: "checkbox" })}
            />
            {/* <Checkbox
              sx={{ marginTop: "32px" }}
              label="Remover depois de sortear"
              size="md"
              {...form.getInputProps("removeName", { type: "checkbox" })}
            /> */}
          </SimpleGrid>
          <Group position="center" mt="xl">
            <Button type="submit" color="blue" leftIcon={<IconDeviceFloppy />}>
              Guardar
            </Button>
            <Button
              type="reset"
              onClick={handleReset}
              color="yellow"
              leftIcon={<IconRefresh />}
            >
              Reset
            </Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  );
}

export default Configuration;
