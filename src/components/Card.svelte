<script lang="ts">
  import JSONTree from 'svelte-json-tree';
  import type { DiffObject } from '../types';
  import { DiffType } from '../enums';

  // PROPS
  export let diff: DiffObject;

  // SCRIPT
  const {
    type,
    propName,
    propPath,
    value: { before, after },
  } = diff;

  type IconSymbol = 'R' | 'A' | 'C';
  const getIconSymbol = (type: DiffType): IconSymbol => {
    switch (type) {
      case DiffType.ADDITION:
        return 'A';
      case DiffType.REMOVAL:
        return 'R';
      case DiffType.CHANGE:
        return 'C';
    }
  };

  const printPath = propPath.replaceAll('.', ' > ');
</script>

<article>
  <section class="header">
    <h3 class="title">
      <span class={`icon type-${getIconSymbol(type)}`}>
        {getIconSymbol(type)}
      </span>
      -
      {propName}
    </h3>
  </section>
  <section class="content">
    <p class="path">{printPath}</p>
    {#if before}
      <code class="removed"><JSONTree value={before} /></code>
    {/if}
    {#if after}
      <code class="added"><JSONTree value={after} /></code>
    {/if}
  </section>
</article>

<style>
  * {
    --border-width: 1px;
  }

  article {
    display: flex;
    flex-direction: column;
    border: var(--border-width) black solid;
    border-radius: 5px;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 2px 2px 5px #0002;
  }

  section.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;

    padding: 5px 1em;

    border-bottom: var(--border-width) black solid;
  }

  span.icon.type-A {
    color: green;
  }
  span.icon.type-R {
    color: red;
  }
  span.icon.type-C {
    color: orange;
  }

  h3.title {
    margin: 0;
    font-weight: bold;
  }

  section.content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
  }

  p.path {
    margin: 0;
    padding: 0;
    opacity: 0.8;
    font-style: italic;
  }

  code {
    position: relative;
    padding: 0.5em;
    border: thin black solid;
    border-radius: 5px;
  }

  code.removed {
    border-color: red;
  }
  code.removed::before {
    content: '';
  }

  code.added {
    border-color: green;
  }
</style>
