import { Tool } from "../..";
import { BUILT_IN_GROUP_NAME, BuiltInToolNames } from "../builtIn";

export const sendTerminalInputTool: Tool = {
  type: "function",
  displayTitle: "Send Terminal Input",
  wouldLikeTo: "send input to the terminal",
  isCurrently: "sending input to the terminal",
  hasAlready: "sent input to the terminal",
  readonly: false,
  group: BUILT_IN_GROUP_NAME,
  function: {
    name: BuiltInToolNames.SendTerminalInput,
    description:
      "Send a line of text (keystroke input) directly to the active VS Code " +
      "integrated terminal. Use this to respond to interactive prompts that are " +
      "already waiting in the terminal — for example typing 'y' to confirm a " +
      "prompt, entering a password, or sending Ctrl+C (use the text '\\x03'). " +
      "For running a new command from scratch, prefer run_terminal_command instead.",
    parameters: {
      type: "object",
      required: ["input"],
      properties: {
        input: {
          type: "string",
          description:
            "The text to send to the terminal. A newline (\\n) is appended " +
            "automatically so the terminal treats it as Enter being pressed. " +
            "To send a raw control character without a newline set addNewline to false.",
        },
        addNewline: {
          type: "boolean",
          description:
            "Whether to append a newline after the input. Default is true. " +
            "Set to false to send raw text without pressing Enter (useful for " +
            "control characters like \\x03 for Ctrl+C).",
        },
      },
    },
  },
  defaultToolPolicy: "allowedWithPermission",
};
