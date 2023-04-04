import { withRouter } from "storybook-addon-react-router-v6";
import { Provider } from "react-redux";
import { store } from "../src/store";

export const decorators = [
  withRouter,
  (story) => <Provider store={store}>{story()}</Provider>,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
