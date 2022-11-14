<script setup lang="ts">
import { computed, StyleValue } from "vue";
import VCheck from './VCheck.vue'

const props = withDefaults(defineProps<{
  borderRadius?: string
  isLast?: boolean
  rowLengthSetted?: boolean
  disabled?: boolean
  inline?: boolean
  selected?: boolean
  showCheckbox?: boolean
  showBorder?: boolean
  showLabels?: boolean
  spacingSize?: number
  swatchColor?: string
  swatchLabel?: string
  swatchAlt?: string
  swatchSize?: number
  swatchStyle?: Record<any, any>
}>(), {
  isLast: false,
  rowLengthSetted: false,
  selected: false,
  spacingSize: 42,
  swatchColor: "",
});

const computedLabelStyle = computed(() => {
  const offset = 8 + Math.floor(props.spacingSize / 5) * 3;
  return {
    bottom: `-${offset}px`
  };
});
const computedSwatchStyle = computed(() => {
  const baseStyles: Record<string, any> = {
    width: `${props.swatchSize}px`,
    height: `${props.swatchSize}px`,
    borderRadius: props.borderRadius,
    backgroundColor: props.swatchColor !== "" ? props.swatchColor : "#FFFFFF",
    cursor: cursorStyle.value
  };
  if (!props.inline || !props.isLast) {
    baseStyles.marginRight = `${props.spacingSize}px`;
  }
  if (props.inline && !props.rowLengthSetted) return baseStyles;
  return {
    ...baseStyles,
    marginBottom: `${props.spacingSize}px`
  };
});
const cursorStyle = computed(() => {
  if (props.disabled) return "not-allowed";
  return "pointer";
});
const labelStyles = computed(() => {
  return [computedLabelStyle.value];
});
const swatchStyles = computed(() => {
  return [computedSwatchStyle.value, props.swatchStyle] as StyleValue;
});
</script>

<template>
  <div
    class="vue-swatches__swatch"
    :class="{
      'vue-swatches__swatch--border': showBorder,
      'vue-swatches__swatch--selected': selected,
      'vue-swatches__swatch--is-disabled': disabled
    }"
    :style="swatchStyles"
    :aria-label="swatchAlt"
    role="button"
    tabindex="0"
    @keyup.enter="$emit('click', swatchColor)"
    @blur="e => $emit('blur', e.relatedTarget)"
  >
    <div
      v-if="swatchColor === ''"
      class="vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"
    >
      <div class="vue-swatches__diagonal"></div>
    </div>
    <v-check v-show="showCheckbox && selected" />
    <div
      v-if="showLabels"
      class="vue-swatches__swatch__label"
      :style="labelStyles"
    >
      {{ swatchLabel }}
    </div>
  </div>
</template>

<style>
.vue-swatches__swatch {
	 position: relative;
	 display: inline-block;
	 font-size: 0;
}
 .vue-swatches__swatch:hover, .vue-swatches__swatch:focus {
	 opacity: 0.9;
	 box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
	 outline: none;
}
 .vue-swatches__swatch.vue-swatches__swatch--border {
	 box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
}
 .vue-swatches__swatch.vue-swatches__swatch--selected {
	 box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
}
 .vue-swatches__swatch__label {
	 position: absolute;
	 left: 0;
	 right: 0;
	 color: #666;
	 font-size: 10px;
	 font-weight: bold;
	 text-align: center;
}
 .vue-swatches__swatch .vue-swatches__diagonal__wrapper {
	 position: absolute;
}

</style>
