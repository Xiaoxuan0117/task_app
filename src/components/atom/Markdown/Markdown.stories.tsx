import { ComponentStory, ComponentMeta } from "@storybook/react";

import Markdown from ".";

export default {
  title: "Markdown",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

const context: string = `__Advertisement :)__\r\n\r\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\r\n  resize in browser.\r\n- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\r\n  i18n with plurals support and easy syntax.\r\n\r\nYou will like those projects!\r\n\r\n---\r\n\r\n# h1 Heading 8-)\r\n## h2 Heading\r\n### h3 Heading\r\n#### h4 Heading\r\n##### h5 Heading\r\n###### h6 Heading\r\n\r\n\r\n## Horizontal Rules\r\n\r\n___\r\n
`;

export const Primary: ComponentStory<typeof Markdown> = () => (
  <Markdown>{context}</Markdown>
);
