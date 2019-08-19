import { OCLoginPluginComponent } from "./src";

const OCLoginPlugin = {
    presentFullScreen: true,
    isFlowBlocker: () => true,
    Component: OCLoginPluginComponent
};

export default OCLoginPlugin;