import { Switch, useColorMode } from "@chakra-ui/react";
import { useOnClient } from "../hooks/on-client";

export const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const ready = useOnClient();

  if (!ready) {
    return null;
  }
  return (
    <Switch
      size="md"
      colorScheme="kraikub.blue.always"
      isChecked={colorMode === "dark"}
      onChange={toggleColorMode}
    />
  );
};
