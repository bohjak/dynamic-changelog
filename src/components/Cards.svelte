<script lang="ts">
  import type { Obj } from 'src/types';
  import { getDiff } from 'json-schema-changelog';
  import Card from './Card.svelte';

  // PROPS
  export let schemas: [Obj, Obj];

  // SCRIPT
  const diffMaps = getDiff(...schemas);
  const additions = diffMaps.additions;
  const removals = diffMaps.removals;
  const changes = diffMaps.changes;
</script>

<section class="wrapper">
  <div class="cards-wrapper">
    <h2>Added</h2>
    {#if additions && additions.size}
      <section class="cards">
        {#each Array.from(additions.values()) as diff}
          <Card {diff} />
        {/each}
      </section>
    {:else}
      <p>-- no additions --</p>
    {/if}
  </div>
  <div class="cards-wrapper">
    <h2>Removed</h2>
    {#if removals && removals.size}
      <section class="cards">
        {#each Array.from(removals.values()) as diff}
          <Card {diff} />
        {/each}
      </section>
    {:else}
      <p>-- no removals --</p>
    {/if}
  </div>
  <div class="cards-wrapper">
    <h2>Changed</h2>
    {#if changes && changes.size}
      <section class="cards">
        {#each Array.from(changes.values()) as diff}
          <Card {diff} />
        {/each}
      </section>
    {:else}
      <p>-- no changes --</p>
    {/if}
  </div>
</section>

<style>
  section.wrapper {
    display: flex;
    flex-flow: row wrap;
    gap: 4em 2em;
    padding: 2em;
  }

  .cards-wrapper {
    flex: 1;
    flex-basis: 500px;
  }

  section.cards {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.5em;
  }
</style>
