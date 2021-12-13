# @kugatsu/vueCompose

## Install

```shell
yarn add @kugatsu/vueComposes
```

## useApi

Composition function to get result and states of a api call

### How to use

```ts
import { useApi } from "@kugatsu/vueComposes";
import { apiFetchUsers } from "~/api"; // Your api to call (payload) : Promise
import { IUser } from "~/models"; // Model if you are using TS

const {
  exec: execUsers,
  results: users,
  loading,
} = useApiOptions<{ active: boolean }, IUser[]>(apiFetchUsers, {
  loader: true,
  defaultValue: [],
});

function reloadUsers() {
  execUsers({ active: true });
}
```
## useApiOptions

Composition function to get result and states of a api call

### How to use

```ts
import { useApiOptions } from "@kugatsu/vueComposes";
import { apiFetchUsers } from "~/api"; // Your api to call (options, payload) : Promise
import { IUser } from "~/models"; // Model if you are using TS

const {
  exec: execUsers,
  results: users,
  loading,
} = useApiOptions<{ active: boolean }, IUser[]>(apiFetchUsers, {
  loader: true,
  defaultValue: [],
});

function reloadUsers() {
  execUsers({ active: true });
}
```


## useSearch

Composition function to filter datas[] with keywords or keyword

### How to use

```vue
<script setup lang="ts">
import { useSearch } from "@kugatsu/vueComposes";

const datas = ref([
  { name: "Romain", age: 32, sport: ["badminton"] },
  { name: "Aline", age: 30, sport: ["tennis", "badminton"] },
]);

const { datasFiltred, search } = useSearch(datas, "");
</script>

<template>
  <input v-model="search" ... />
  <div>
    {{ datasFiltred }}
  </div>
</template>
```

## useScreenSize

Composition function to filter datas[] with keywords or keyword

### How to use

```vue
<script setup lang="ts">
import { useScreenSize } from "@kugatsu/useScreenSize";

const { width, height, isMobile } = useSearch(datas, "");
</script>

<template>
  <div>{{ width }}</div>
  <div>{{ height }}</div>

  <div v-if="isMobile">show only on mobile</div>
</template>
```

You can change the mobile size value

```ts
import { setSizeMobile } from "@kugatsu/useScreenSize";
setSizeMobile(1024);
```
