<script setup lang="ts">
const route = useRoute();

const { data: allUsers, status } = await useFetch("/api/users");

const loadingIndicator = useLoadingIndicator();
watchEffect(() => {
  status.value ? loadingIndicator.start() : loadingIndicator.finish();
});

const users = computed(() => {
  const query = route.query["users"];
  if (typeof query !== "string") {
    return;
  }
  const ids = query.split(",");
  return allUsers.value?.filter((user) => ids.includes(user.discord_id));
});
</script>

<template>
  <Custom v-if="users" :users="users" />
</template>
