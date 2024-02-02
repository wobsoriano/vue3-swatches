---
sidebar: auto
---

# Examples

<script setup>
import Simple from './components/examples/Simple.vue'
import Preset from './components/examples/Preset.vue'
import CustomTrigger from './components/examples/CustomTrigger.vue'
import CustomColors from './components/examples/CustomColors.vue'
</script>

<style>
.form__field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}

.form__label strong {
  font-size: 1.2rem;
}

.form__input__element {
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: none;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
</style>

## Simple

<Simple />

:::details View Code
<<< ./components/examples/Simple.vue
:::

## Using a Preset

Vue Swatches has a bunch of [presets](/presets) ready to use. Make sure to check it out!

<Preset />

::: details View Code
<<< ./components/examples/Preset.vue
:::

## Using a Custom Trigger

You can use your custom trigger. Useful to show `buttons`, `icons`, custom `inputs`!

<CustomTrigger />

:::details View Code
<<< ./components/examples/CustomTrigger.vue
:::

## Custom Colors

Remember to use always **6-digits** hexadecimal colors. If you want to provide a **transparent/no-color** option you can use a empty string (`''`).

<CustomColors />

::: details View Code
<<< ./components/examples/CustomColors.vue
:::
