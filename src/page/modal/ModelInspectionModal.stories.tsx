import type { Meta, StoryObj } from "@storybook/react";
import { ModelInspectionModal } from "./ModelInspectionModal";

const meta: Meta<typeof ModelInspectionModal> = {
  title: "Pages/Modal/ModelInspectionModal",
  component: ModelInspectionModal,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fYvi8OPfF4d7EWRovK1Gsc/?node-id=40000001-41787",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-surface p-10">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof ModelInspectionModal> = {
  args: {
    onClose: () => {},
  },
};
