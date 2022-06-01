import * as Vue from "vue";

declare const _default: Vue.DefineComponent<{}, {}, any>;
declare const presets: {
  basic: {
      colors: string[];
      rowLength: number;
  };
  "text-basic": {
      colors: string[];
      showBorder: boolean;
  };
  "text-advanced": {
      colors: string[][];
      borderRadius: string;
      rowLength: number;
      swatchSize: number;
      spacingSize: number;
  };
}

export {
  presets,
  _default as default
}
