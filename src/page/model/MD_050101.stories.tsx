import type { Meta, StoryObj } from "@storybook/react";
import { MD_050101 } from "./MD_050101";

const meta: Meta<typeof MD_050101> = {
  title: "Pages/Model/MD_050101 모델 탐색",
  component: MD_050101,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/tjxONVhn5Zs2XIlu3M8wZc/-%EC%95%8C%EC%A0%9C%EA%B3%B1-%EA%B3%B5%EC%9C%A0%EC%9A%A9-%EC%88%98%EC%97%85%EC%9E%90%EB%A3%8C?node-id=4030-8896",
    },
  },
};
export default meta;

type Story = StoryObj<typeof MD_050101>;

export const Default: Story = {};
