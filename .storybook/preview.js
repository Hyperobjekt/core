import { withMuiTheme } from "@harelpls/storybook-addon-materialui";

import { lightTheme, darkTheme } from "../src/themes";

export const decorators = [
  withMuiTheme({
    "Custom light theme": lightTheme,
    "Custom dark theme": darkTheme,
  }),
];
