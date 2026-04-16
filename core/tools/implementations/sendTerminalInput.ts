import { getBooleanArg, getStringArg } from "../parseArgs";
import { ToolImpl } from ".";

export const sendTerminalInputImpl: ToolImpl = async (args, extras) => {
  const input = getStringArg(args, "input", true);
  const addNewline = getBooleanArg(args, "addNewline", true) ?? true;

  await extras.ide.sendTerminalInput(input, addNewline);

  return [
    {
      name: "Terminal Input Sent",
      description: "Text sent to terminal",
      content: `Sent to terminal: ${JSON.stringify(input)}${addNewline ? " (+ newline)" : ""}`,
    },
  ];
};
