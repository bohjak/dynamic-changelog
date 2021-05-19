<script lang="ts">
  import Cards from './components/Cards.svelte';
  import { fetchSchema } from './lib/fetch-schema';
  import { getFetchOptions } from './lib/get-fetch-options';

  // SCRIPT
  const [optionsA, optionsB] = getFetchOptions();

  const fetchSchemas = () => {
    return Promise.all([fetchSchema(optionsA), fetchSchema(optionsB)]);
  };
</script>

<div>
  {#await fetchSchemas()}
    <p>Loading schemas...</p>
  {:then schemas}
    <Cards {schemas} />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style>
  div {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
