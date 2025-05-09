<script lang="ts">
  import { getCandidateList, searchCandidate } from "../lib/data";
  import Candidate from "./Candidate.svelte";
  import type { Candidate as TCandidate } from "../lib/types";
  import Filter from "./Filter.svelte";
  let {
    searchTerm = "",
  }: {
    searchTerm: string;
  } = $props();

  let showOnlyMajor = $state([]);

  function filterSelectedMajors(
    candidatesList: TCandidate[],
    majors: string[],
  ) {
    return candidatesList.filter((candidate) => {
      if (majors.length === 0) {
        return true;
      }
      return majors.includes(candidate.major.replace("web_", ""));
    });
  }

  function formatMajor(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
</script>

<main class="container mx-auto my-40 p-5">
  <div>
    <span class="font-mono font-semibold text-lg">YWC20</span>
    <h1 class="text-3xl font-bold mb-4">Interview candidates</h1>
  </div>
  <div>
    {#await getCandidateList([])}
      <p>Loading...</p>
    {:then { candidateList, majors }}
      <div class="flex flex-col gap-0 my-4">
        <input
          type="text"
          class="border-2 border-base-200 max-w-80 rounded p-2 my-2"
          bind:value={searchTerm}
          placeholder="Search..."
        />
        <Filter bind:showOnlyMajor {majors} />
      </div>
      {#if searchTerm}
        {#await searchCandidate(searchTerm, candidateList, showOnlyMajor)}
          <p>Loading candidate...</p>
        {:then searchResults}
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {#each searchResults as result}
              {@const candidate = candidateList[result.id]}
              <Candidate {candidate} />
            {:else}
              <div
                class="flex flex-col gap-2 items-start justify-start w-full h-full"
              >
                {#if showOnlyMajor.length !== majors.length}
                  <span class="text-red-500">
                    No candidate(s) found in {showOnlyMajor
                      .map(formatMajor)
                      .join(", ")}.
                  </span>
                  <button
                    class="cursor-pointer border px-3 text-base-700 border-base-300 rounded-2xl"
                    onclick={() => (showOnlyMajor = majors)}
                    >Try again with all majors?</button
                  >
                {:else}
                  <span class="text-red-500">
                    No candidate(s) found in any major :(
                  </span>
                {/if}
              </div>
            {/each}
          </div>
        {:catch error}
          <p>Error: {error.message}</p>
        {/await}
      {:else}
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {#each filterSelectedMajors(candidateList, showOnlyMajor) as candidate}
            <Candidate {candidate} />
          {/each}
        </div>
      {/if}
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
  </div>
</main>
