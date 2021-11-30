# @kugatsu/vueCompose

## useApi

Composition function to get result and states of a api call

### Install

```shell
yarn add @kugatsu/vueComposes
```

### How to use

```ts
import { useApi } from "@kugatsu/vueComposes";
import { apiFetchUsers } from "~/api"; // Your api to call () : Promise
import { IUser } from "~/models"; // Model if you are using TS

const {
  exec: execUsers,
  results: users,
  loading,
} = useApi<IUser, { active: boolean }>(apiFetchUsers, {
  loader: true,
  defaultValue: [],
});

function reloadUsers() {
  execUsers({ active: true });
}
```

## useSearch

Composition function to filter datas[] with keywords or keyword

### Install

```shell
yarn add @kugatsu/vueComposes
```

### How to use

```vue
<script setup lang="ts">
import { useSearch } from "@kugatsu/vueComposes";

const datas = ref([
  { name: "Romain", age: 32, sport: ["badminton"] },
  { name: "Aline", age: 30, sport: ["tennis", "badminton"] },
]);

const { datasFiltred, search } = useSearch(datas);
</script>

<template>
  <input v-model="search" ... />
  <div>
    {{ datasFiltred }}
  </div>
</template>
```
