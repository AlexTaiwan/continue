import { Tool } from "../..";
import { BUILT_IN_GROUP_NAME, BuiltInToolNames } from "../builtIn";

export const readTerminalTool: Tool = {
  type: "function",
  displayTitle: "Read Terminal",
  wouldLikeTo: "read the current terminal output",
  isCurrently: "reading the current terminal output",
  hasAlready: "read the current terminal output",
  readonly: true,
  group: BUILT_IN_GROUP_NAME,
  function: {
    name: BuiltInToolNames.ReadTerminal,
    description:
      "Read the current contents of the active VS Code integrated terminal. " +
      "Use this to see what is displayed in the terminal right now — useful for " +
      "checking the output of a command that was run via runCommand, inspecting " +
      "prompts waiting for input, or verifying the terminal state before deciding " +
      "what to do next.",
    parameters: {
      type: "object",
      required: [],
      properties: {},
    },
  },
  defaultToolPolicy: "allowedWithoutPermission",
};
