import {
  ColorInput,
  Textarea,
  TextInput,
  NumberInput,
  Stack,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Configuration(props) {
  const form = useForm({
    initialValues: {
      itens: "",
      prefix: "",
      suffix: "",
      amount: 1,
      color: "#000000",
      background: "",
      button_label: "Sortear",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  return (
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
        <Group spacing={"lg"}>
          <TextInput
            label="Prefixo"
            placeholder="Pode usar emojis como 🎉"
            {...form.getInputProps("prefix")}
          />
          <TextInput
            label="Sufixo"
            placeholder="Pode usar emojis como 🥳"
            {...form.getInputProps("suffix")}
          />
          <NumberInput
            value={props.amount}
            placeholder=""
            label="Número de vencedores"
            withAsterisk
            {...form.getInputProps("amount")}
          />
          <TextInput
            value={props.amount}
            placeholder=""
            label="Texto do botão sortear"
            withAsterisk
            {...form.getInputProps("button_label")}
          />
        </Group>
        <Group spacing={"lg"}>
          <TextInput
            label="Fundo"
            placeholder="URLs, CSS, #HEX"
            {...form.getInputProps("background")}
          />
          <ColorInput
            label="Cor do texto"
            placeholder=""
            {...form.getInputProps("color")}
          />
        </Group>
        <Group position="center" mt="xl">
          <Button type="submit" color="blue">
            Guardar
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

export default Configuration;
