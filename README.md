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
