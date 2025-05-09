<script lang="ts">
  import {
    getCandidateList,
    getIndexedContent,
    searchCandidate,
  } from "../lib/data";
  let {
    searchTerm = "",
  }: {
    searchTerm: string;
  } = $props();
</script>

{#await getCandidateList()}
  <p>Loading...</p>
{:then candidateList}
  <input type="text" bind:value={searchTerm} placeholder="Search..." />
  {#if searchTerm}
    {#await searchCandidate(searchTerm)}
      <p>Loading search results...</p>
    {:then searchResults}
      <ul>
        {#each searchResults as result}
          {@const candidate = candidateList[result.id]}
          <li>
            <code>
              {candidate.interviewRefNo}
            </code>
            {candidate.firstName}
            {candidate.lastName}
            ({candidate.major})
          </li>
        {/each}
      </ul>
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
  {:else}
    <ul>
      {#each candidateList as candidate}
        <li>
          <code>
            {candidate.interviewRefNo}
          </code>
          {candidate.firstName}
          {candidate.lastName}
          ({candidate.major})
        </li>
      {/each}
    </ul>
  {/if}
{:catch error}
  <p>Error: {error.message}</p>
{/await}
