<script lang="ts">
  import Cards from './components/Cards.svelte';
  import { fetchSchema } from './lib';

  // SCRIPT
  const urlParams = new URLSearchParams(window.location.search);

  const urlTemplate = urlParams.get('urlTemplate');
  if (!urlTemplate) throw new Error('No URL specified');
  const varsA = {
    ...JSON.parse(urlParams.get('vars') ?? '{}'),
    ...JSON.parse(urlParams.get('varsA') ?? '{}'),
  };
  const varsB = {
    ...JSON.parse(urlParams.get('vars') ?? '{}'),
    ...JSON.parse(urlParams.get('varsB') ?? '{}'),
  };
  const headersA = {
    ...JSON.parse(urlParams.get('headers') ?? '{}'),
    ...JSON.parse(urlParams.get('headersA') ?? '{}'),
  };
  const headersB = {
    ...JSON.parse(urlParams.get('headers') ?? '{}'),
    ...JSON.parse(urlParams.get('headersB') ?? '{}'),
  };

  const fetchSchemas = () => {
    return Promise.all([
      fetchSchema({
        urlTemplate,
        vars: varsA,
        headers: headersA,
      }),
      fetchSchema({
        urlTemplate,
        vars: varsB,
        headers: headersB,
      }),
    ]);
  };
</script>

<div>
  {#await fetchSchemas()}
    <p>loading schemas...</p>
  {:then schemas}
    <Cards {schemas} />
  {:catch error}
    <p>you done goofed: {error.message}</p>
  {/await}
</div>

<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
