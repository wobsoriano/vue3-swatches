# vue3-swatches

🎨 Help the user picking beautiful colors!

Though not a fork, this package is a complete copy of [vue-swatches](https://github.com/saintplay/vue-swatches) made to work with Vue 3.

## Install

```sh
yarn add vue3-swatches
```

## Example

### Install as a global plugin (Optional)

```js
// main.js
import { createApp } from 'vue'
import VSwatches from 'vue3-swatches'

const app = createApp(App)
app.use(VSwatches)
```

### Or: Import and register it locally

```html
<template>
  <VSwatches v-model="color" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import VSwatches from 'vue3-swatches'

export default defineComponent({
  components: { VSwatches },
  setup() {
    const color = ref('#1FBC9C')

    return {
      color
    }
  }
})
</script>
```

Head over to https://saintplay.github.io/vue-swatches/ for the complete documentation.

### License

[MIT License](http://opensource.org/licenses/MIT).