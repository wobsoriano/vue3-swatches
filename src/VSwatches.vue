<template>
  <div class="vue-swatches" tabindex="-1" ref="main" @blur="e => onBlur(e.relatedTarget as any)">
    <!-- Trigger -->
    <div
      v-if="!inline"
      ref="triggerWrapper"
      class="vue-swatches__trigger__wrapper"
      @click="togglePopover"
    >
      <slot name="trigger">
        <div
          class="vue-swatches__trigger"
          :class="{
            'vue-swatches--is-empty': !modelValue,
            'vue-swatches--is-disabled': disabled
          }"
          :style="triggerStyles"
        >
          <div
            v-show="isNoColor"
            class="vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"
          >
            <div class="vue-swatches__diagonal"></div>
          </div>
        </div>
      </slot>
    </div>

    <transition name="vue-swatches-show-hide">
      <!-- The container handles the padding -->
      <div
        ref="containerWrapper"
        v-show="inline || isOpen"
        class="vue-swatches__container"
        :class="{ 'vue-swatches--inline': inline }"
        :style="containerStyles"
      >
        <!-- The wrapper handles the internal spacing -->
        <div class="vue-swatches__wrapper" :style="wrapperStyles">
          <!-- for nested distribution -->
          <template v-if="isNested">
            <div
              v-for="(swatchRow, index) in computedSwatches"
              :key="index"
              class="vue-swatches__row"
            >
              <v-swatch
                v-for="(swatch, swatchIndex) in swatchRow"
                :key="swatchIndex"
                :is-last="
                  index === computedSwatches.length - 1 &&
                    swatchIndex === (swatchRow as []).length
                "
                :row-length-setted="
                  rowLength !== null || presetRowLength !== null
                "
                :border-radius="computedBorderRadius as string"
                :disabled="getSwatchDisabled(swatch)"
                :inline="inline"
                :selected="checkEquality(getSwatchColor(swatch), modelValue)"
                :swatch-size="computedSwatchSize"
                :spacing-size="computedSpacingSize as number"
                :show-border="getSwatchShowBorder(swatch)"
                :show-checkbox="showCheckbox"
                :show-labels="showLabels"
                :swatch-color="getSwatchColor(swatch)"
                :swatch-label="getSwatchLabel(swatch)"
                :swatch-alt="getSwatchAlt(swatch)"
                :swatch-style="swatchStyle"
                @blur="relatedTarget => onBlur(relatedTarget)"
                @click.native="updateSwatch(swatch)"
              />
            </div>
          </template>

          <!-- for normal distribution -->
          <template v-else>
            <v-swatch
              v-for="(swatch, swatchIndex) in computedSwatches"
              :key="swatchIndex"
              :is-last="swatchIndex === computedSwatches.length - 1"
              :row-length-setted="
                rowLength !== null || presetRowLength !== null
              "
              :border-radius="computedBorderRadius as string"
              :disabled="getSwatchDisabled(swatch)"
              :inline="inline"
              :selected="checkEquality(getSwatchColor(swatch), modelValue)"
              :swatch-size="computedSwatchSize"
              :spacing-size="computedSpacingSize as number"
              :show-border="getSwatchShowBorder(swatch)"
              :show-checkbox="showCheckbox"
              :show-labels="showLabels"
              :swatch-color="getSwatchColor(swatch)"
              :swatch-label="getSwatchLabel(swatch)"
              :swatch-alt="getSwatchAlt(swatch)"
              :swatch-style="swatchStyle"
              @blur="relatedTarget => onBlur(relatedTarget)"
              @click.native="updateSwatch(swatch)"
            />
          </template>
        </div>
        <div
          v-if="showFallback"
          class="vue-swatches__fallback__wrapper"
          :style="computedFallbackWrapperStyles"
        >
          <span class="vue-swatches__fallback__input--wrapper">
            <input
              ref="fallbackInput"
              class="vue-swatches__fallback__input"
              :class="fallbackInputClass"
              :value="internalValue"
              :type="fallbackInputType"
              @input="
                e => updateSwatch((e.target as HTMLInputElement).value, { fromFallbackInput: true })
              "
            />
          </span>
          <button
            v-if="showFallbackOk"
            class="vue-swatches__fallback__button"
            :class="fallbackOkClass"
            @click.prevent="onFallbackButtonClick"
          >
            {{ fallbackOkText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref, StyleValue, watch } from "vue";
import basicPreset from "./presets/basic";
import textBasicPreset from "./presets/text-basic";
import textAdvancedPreset from "./presets/text-advanced";
import VSwatch from "./VSwatch.vue";

const main = ref<HTMLDivElement | null>(null)
const triggerWrapper = ref<HTMLDivElement | null>(null)
const containerWrapper = ref<HTMLDivElement | null>(null)

const DEFAULT_BORDER_RADIUS = "10px";
const DEFAULT_ROW_LENGTH = 4;
const DEFAULT_TRIGGER_CONTAINER_SPACE = 5;
const DEFAULT_SWATCH_SIZE = 42;
const DEFAULT_SHOW_BORDER = false;
const extractPropertyFromPreset = (
  presetName: any,
  property: string,
  alwaysReturn?: boolean
) => {
  if (typeof presetName !== "string") return null;
  else if (presetName === "text-basic")
    return textBasicPreset[property as keyof typeof textBasicPreset] === undefined
      ? null
      : textBasicPreset[property as keyof typeof textBasicPreset];
  else if (presetName === "text-advanced")
    return textAdvancedPreset[property as keyof typeof textAdvancedPreset] === undefined
      ? null
      : textAdvancedPreset[property as keyof typeof textAdvancedPreset];
  else if (presetName === "basic")
    return basicPreset[property as keyof typeof basicPreset] === undefined ? null : basicPreset[property as keyof typeof basicPreset];
  else if (alwaysReturn)
    return basicPreset[property as keyof typeof basicPreset] === undefined ? null : basicPreset[property as keyof typeof basicPreset];
  else return null;
};

const props = withDefaults(defineProps<{
  backgroundColor?: string
  closeOnSelect?: boolean
  swatches?: any[] | string
  disabled?: boolean
  fallbackInputClass?: any[] | Record<string, any> | string | null
  fallbackInputType?: string
  fallbackOkClass?: any[] | Record<string, any> | string  | null
  fallbackOkText?: string
  inline?: boolean
  shapes?: string
  popoverX?: string
  popoverY?: string
  rowLength?: number | string | null
  showBorder?: boolean | null
  showFallback?: boolean
  showCheckbox?: boolean
  showLabels?: boolean
  spacingSize?: number | null
  swatchSize?: number | string | null
  swatchStyle?: Record<string, any> | any[]
  triggerStyle?: Record<string, any> | any[]
  wrapperStyle?: Record<string, any> | any[]
  modelValue?: string
}>(), {
  backgroundColor: "#ffffff",
  closeOnSelect: true,
  swatches: () => "basic",
  disabled: false,
  fallbackInputClass: null,
  fallbackInputType: () => "text",
  fallbackOkClass: null,
  fallbackOkText: "Ok",
  inline: false,
  shapes: "squares",
  popoverX: "right",
  popoverY: "bottom",
  rowLength: null,
  showBorder: null,
  showFallback: false,
  showCheckbox: true,
  showLabels: false,
  spacingSize: null,
  swatchSize: null,
  modelValue: '',
});

const $emit = defineEmits(["close", "open", "update:modelValue"]);

const alwaysOnScreenStyle = ref({});
const componentMounted = ref(false);
const internalValue = ref(props.modelValue);
const internalIsOpen = ref(false);

onMounted(() => {
  componentMounted.value = true;
});

const isNested = computed(() => {
  if (
    computedSwatches.value &&
    computedSwatches.value.length &&
    // @ts-ignore
    computedSwatches.value[0] instanceof Array
  ) {
    return true;
  }
  return false;
});
const isOpen = computed(() => {
  if (props.inline) return false;
  return internalIsOpen.value;
});
const isNoColor = computed(() => {
  return checkEquality("", props.modelValue);
});
const presetBorderRadius = computed(() => {
  return extractPropertyFromPreset(props.swatches, "borderRadius");
});
const presetRowLength = computed(() => {
  return extractPropertyFromPreset(props.swatches, "rowLength");
});
const presetShowBorder = computed(() => {
  return extractPropertyFromPreset(props.swatches, "showBorder");
});
const presetSwatchSize = computed(() => {
  return extractPropertyFromPreset(props.swatches, "swatchSize");
});
const presetSpacingSize = computed(() => {
  return extractPropertyFromPreset(props.swatches, "spacingSize");
});
const computedSwatches = computed(() => {
  if (props.swatches instanceof Array) return props.swatches;
  /* istanbul ignore else */
  if (typeof props.swatches === "string") {
    return extractPropertyFromPreset(props.swatches, "colors", true);
  } else {
    return [];
  }
}) as ComputedRef<[]>;
const computedBorderRadius = computed(() => {
  // Priorize preset value
  if (presetBorderRadius.value !== null) return presetBorderRadius.value;
  // over computed value
  return borderRadius.value;
});
const computedRowLength = computed(() => {
  // Priorize user value
  if (props.rowLength !== null) return Number(props.rowLength);
  // Over preset value
  else if (presetRowLength.value !== null) return presetRowLength.value;
  // If there are less swatches than the default
  else if (
    computedSwatches.value.length < DEFAULT_ROW_LENGTH &&
    !isNested.value
  )
    return computedSwatches.value.length;
  // Use default otherwise
  return DEFAULT_ROW_LENGTH;
});
const computedSwatchSize = computed(() => {
  // Priorize user value
  if (props.swatchSize !== null) return Number(props.swatchSize);
  else if (presetSwatchSize.value !== null)
    // over preset value
    return presetSwatchSize.value;
  // Use default value if these two are unset
  return DEFAULT_SWATCH_SIZE;
}) as ComputedRef<number>;
const computedSpacingSize = computed(() => {
  // Priorize user value
  if (props.spacingSize !== null) return props.spacingSize;
  // Priorize preset value
  if (presetSpacingSize.value !== null) return presetSpacingSize.value;
  // over computed value
  return Math.round(computedSwatchSize.value * 0.25);
});
const computedShowBorder = computed(() => {
  // Priorize user value
  if (props.showBorder !== null) return props.showBorder;
  // over preset value
  if (presetShowBorder.value !== null) return presetShowBorder.value;
  // Use default value if these two are unset
  return DEFAULT_SHOW_BORDER;
});
const showFallbackOk = computed(() => {
  return !props.inline;
});
const borderRadius = computed(() => {
  if (props.shapes === "squares")
    return `${Math.round(computedSwatchSize.value * 0.25)}px`;
  else if (props.shapes === "circles") return `50%`;
  /* istanbul ignore next */
  return "";
});
const wrapperWidth = computed(() => {
  return (
    // @ts-ignore
    computedRowLength.value * (computedSwatchSize.value + computedSpacingSize.value)
  );
});
const computedtriggerStyle = computed(() => {
  return {
    width: "42px",
    height: "42px",
    backgroundColor: props.modelValue ? props.modelValue : "#ffffff",
    borderRadius: props.shapes === "circles" ? "50%" : DEFAULT_BORDER_RADIUS
  };
});
const triggerStyles = computed(() => {
  return [computedtriggerStyle.value, props.triggerStyle] as StyleValue;
});
const containerStyles = computed(() => {
  const baseStyles = [
    {
      backgroundColor: props.backgroundColor
    },
    alwaysOnScreenStyle.value
  ];
  if (props.inline) return baseStyles;
  return [
    ...baseStyles,
    {
      padding: "5px",
      marginBottom: "5px"
    }
  ];
});
const computedWrapperStyle = computed(() => {
  if (props.inline) return {};
  return {
    paddingTop: `${computedSpacingSize.value}px`,
    paddingLeft: `${computedSpacingSize.value}px`,
    width: `${wrapperWidth.value}px`
  };
});
const wrapperStyles = computed(() => {
  return [computedWrapperStyle.value, props.wrapperStyle] as StyleValue;
});
const computedFallbackWrapperStyle = computed(() => {
  const baseStyles = {
    marginLeft: `${computedSpacingSize.value}px`,
    paddingBottom: `${computedSpacingSize.value}px`
  };
  if (props.inline) return baseStyles;
  return {
    ...baseStyles,
    width: `${wrapperWidth.value - (computedSpacingSize.value as number)}px`
  };
});
const computedFallbackWrapperStyles = computed(() => {
  return [computedFallbackWrapperStyle.value];
});

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

function checkEquality(color1: string, color2: string) {
  if ((!color1 && color1 !== "") || (!color2 && color2 !== ""))
    return false;
  return color1.toUpperCase() === color2.toUpperCase();
};
function hidePopover() {
  internalIsOpen.value = false;
  main.value?.blur();
  $emit("close", internalValue.value);
};
function getAlwaysOnScreenStyle() {
  const styles: Record<string, string | number> = {};
  const triggerEl = triggerWrapper.value!
  const containerEl = containerWrapper.value!
  /* istanbul ignore if */
  if (
    !componentMounted.value ||
    props.inline ||
    !triggerEl ||
    !window ||
    !document
  )
    return styles;
  const triggerRect = triggerEl.getBoundingClientRect();
  const leftMin = 5;
  const rightMax =
    (document.documentElement.clientWidth || window.innerWidth) - 5;
  const topMin = 5;
  const bottomMax =
    (document.documentElement.clientHeight || window.innerHeight) - 5;
  containerEl.style.visibility = "hidden";
  containerEl.style.display = "block";
  const containerRect = containerEl.getBoundingClientRect();
  containerEl.style.display = "none";
  containerEl.style.visibility = "visible";
  if (props.popoverY === "top") {
    if (triggerRect.top - containerRect.height < topMin) {
      // Showing bellow
      styles.top = `${triggerRect.height +
        DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
      styles.bottom = "auto";
    } else {
      // Showing above
      styles.bottom = `${triggerRect.height +
        DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
      styles.top = "auto";
    }
  } else {
    /* istanbul ignore else */
    if (props.popoverY === "bottom") {
      if (triggerRect.bottom + containerRect.height > bottomMax) {
        // Showing above
        styles.bottom = `${triggerRect.height +
          DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
        styles.top = "auto";
      } else {
        // Showing bellow
        styles.top = `${triggerRect.height +
          DEFAULT_TRIGGER_CONTAINER_SPACE}px`;
        styles.bottom = "auto";
      }
    }
  }
  if (props.popoverX === "left") {
    if (triggerRect.right - containerRect.width < leftMin) {
      // Showing at the right
      styles.left = 0;
      styles.right = "auto";
    } else {
      // Showing at the left
      styles.right = 0;
      styles.left = "auto";
    }
  } else {
    /* istanbul ignore else */
    if (props.popoverX === "right") {
      if (triggerRect.left + containerRect.width > rightMax) {
        // Showing at the left
        styles.right = 0;
        styles.left = "auto";
      } else {
        // Showing at the right
        styles.left = 0;
        styles.right = "auto";
      }
    }
  }
  return styles;
};
function getSwatchShowBorder(swatch: string | Record<string, any>) {
  if (typeof swatch === "string") return computedShowBorder.value;
  else if (typeof swatch === "object")
    return swatch.showBorder !== undefined
      ? swatch.showBorder
      : computedShowBorder.value;
};
function getSwatchColor(swatch: string | Record<string, any>) {
  if (typeof swatch === "string") return swatch;
  else if (typeof swatch === "object") return swatch.color;
};
function getSwatchDisabled(swatch: string | Record<string, any>) {
  if (typeof swatch === "string") return props.disabled;
  else if (typeof swatch === "object")
    return swatch.disabled !== undefined ? swatch.disabled : props.disabled;
};
function getSwatchLabel(swatch: string | Record<string, any>) {
  if (typeof swatch === "string") return swatch;
  else if (typeof swatch === "object") return swatch.label || swatch.color;
};
function getSwatchAlt(swatch: string | Record<string, any>) {
  if (typeof swatch === "string") return swatch;
  else if (typeof swatch === "object")
    return swatch.alt || getSwatchLabel(swatch);
};
function onBlur(relatedTarget: HTMLElement) {
  /* istanbul ignore if */
  if (!isOpen.value) return; /* dont hide */
  // We only close the Popover if the relatedTarget came from outside the component
  // Check if the relatedTarget is inside the component
  if (relatedTarget !== null && main.value?.contains(relatedTarget))
    return; /* dont hide */
  internalIsOpen.value = false;
  $emit("close", internalValue.value);
};
function onFallbackButtonClick() {
  hidePopover();
};
function showPopover() {
  /* istanbul ignore if */
  if (isOpen.value || props.inline || props.disabled) return; /* dont show */
  alwaysOnScreenStyle.value = getAlwaysOnScreenStyle();
  internalIsOpen.value = true;
  main.value?.focus();
  $emit("open");
};
function togglePopover() {
  isOpen.value ? hidePopover() : showPopover();
};
// @ts-ignore
function updateSwatch(swatch, { fromFallbackInput } = {}) {
  if (getSwatchDisabled(swatch)) return;
  const color = getSwatchColor(swatch);
  internalValue.value = color;
  $emit("update:modelValue", color);
  if (props.closeOnSelect && !props.inline && !fromFallbackInput) {
    hidePopover();
  }
};
</script>

<style>
fieldset[disabled] .vue-swatches {
	 pointer-events: none;
}
 .vue-swatches {
	 position: relative;
	 display: inline-block;
	 outline: none;
}
 .vue-swatches__trigger__wrapper {
	 display: inline-block;
	 cursor: pointer;
}
 .vue-swatches__trigger.vue-swatches--is-empty {
	 border: 2px solid #ccc;
}
 .vue-swatches__trigger.vue-swatches--is-disabled {
	 cursor: not-allowed;
}
 .vue-swatches__container {
	 box-sizing: content-box;
}
 .vue-swatches__container.vue-swatches--inline {
	 font-size: 0;
}
 .vue-swatches__container:not(.vue-swatches--inline) {
	 position: absolute;
	 display: block;
	 overflow: auto;
	 border-radius: 5px;
	 box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
	 z-index: 50;
}
 .vue-swatches__wrapper {
	 background-color: inherit;
	 box-sizing: content-box;
}
 .vue-swatches__row {
	 font-size: 0;
}
 .vue-swatches__fallback__wrapper {
	 display: table;
}
 .vue-swatches__fallback__input--wrapper {
	 display: table-cell;
	 padding-right: 10px;
	 width: 100%;
	 font-size: 14px;
}
 .vue-swatches__fallback__input {
	 width: 100%;
	 padding-top: 6px;
	 padding-bottom: 6px;
	 border-radius: 5px;
	 border: 1px solid #dcdcdc;
	 color: #35495e;
	 background: #fff;
}
 .vue-swatches__fallback__button {
	 display: table-cell;
	 padding: 6px 15px;
	 border: 0;
	 cursor: pointer;
	 font-weight: bold;
	 color: #fff;
	 background-color: #3571c8;
	 border-radius: 5px;
}
 .vue-swatches-show-hide-enter-active, .vue-swatches-show-hide-leave-active {
	 transition: all 0.3s ease;
}
 .vue-swatches-show-hide-enter, .vue-swatches-show-hide-leave-active {
	 opacity: 0;
}
 .vue-swatches--has-children-centered {
	 display: flex;
	 align-items: center;
	 justify-content: center;
}
 .vue-swatches__diagonal__wrapper {
	 width: 100%;
	 height: 100%;
}
 .vue-swatches__diagonal {
	 width: 75%;
	 height: 75%;
	 background: linear-gradient(to top right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) calc(50% - 2.4px), rgba(222, 8, 10, 1) 50%, rgba(0, 0, 0, 0) calc(50% + 2.4px), rgba(0, 0, 0, 0) 100%);
}
</style>
