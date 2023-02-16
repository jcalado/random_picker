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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";

function Configuration(props) {
  const [state, setState] = useState({ urlInfo: false });

  const form = useForm({
    initialValues: {
      itens: "",
      prefix: "",
      suffix: "",
      amount: 1,
      color: "#000000",
      background: "",
      button_label: "Sortear",
      duration: 5,
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
          npm
          maxRows={10}
          {...form.getInputProps("itens")}
        />
        <SimpleGrid cols={4}>
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
        </SimpleGrid>
        <SimpleGrid cols={4}>
          <TextInput
            label="Fundo"
            placeholder="URL da imagem"
            {...form.getInputProps("background")}
          />
          <ColorInput
            label="Cor do texto"
            placeholder=""
            {...form.getInputProps("color")}
          />
          <NumberInput
            value={props.duration}
            placeholder="Em segundos"
            label="Duração do sorteio"
            withAsterisk
            {...form.getInputProps("duration")}
          />
          <Checkbox label="Celebrar! 🎊" {...form.getInputProps('celebrate', { type: 'checkbox' })} />
        </SimpleGrid>
        <Group position="center" mt="xl">
          <Button type="submit" color="blue" leftIcon={<IconDeviceFloppy />}>
            Guardar
          </Button>
        </Group>
      </form>
    </Stack>
  );
}

export default Configuration;
