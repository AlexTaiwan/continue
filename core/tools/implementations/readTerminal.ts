import { ToolImpl } from ".";

export const readTerminalImpl: ToolImpl = async (_args, extras) => {
  const contents = await extras.ide.getTerminalContents();

  return [
    {
      name: "Terminal",
      description: "Current terminal contents",
      content: contents || "(terminal is empty or no terminal is open)",
    },
  ];
};
