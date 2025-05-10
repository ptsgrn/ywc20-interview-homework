<script lang="ts">
  import type { MajorKey } from "../lib/types";

  const uid = $props.id();
  let {
    showOnlyMajor = $bindable([]),
    majors = $bindable([]),
    searchTerm = $bindable(""),
  }: {
    showOnlyMajor: string[];
    majors: MajorKey[];
    searchTerm: string;
  } = $props();

  function toggleMajor(major: string) {
    if (showOnlyMajor.includes(major)) {
      showOnlyMajor = showOnlyMajor.filter((m) => m !== major);
    } else {
      showOnlyMajor = [...showOnlyMajor, major];
    }
  }
</script>

<input
  type="text"
  class="border-2 border-base-200 max-w-80 bg-light-bg-2 rounded p-2 my-2"
  bind:value={searchTerm}
  placeholder="Search..."
/>

<div class="flex flex-row flex-wrap gap-2">
  {#each majors as major}
    <div data-major={major}>
      <input
        hidden
        name={major}
        type="checkbox"
        class="peer"
        onchange={() => toggleMajor(major)}
        checked={showOnlyMajor.includes(major)}
        id={`${uid}-${major}`}
      />
      <label
        for={`${uid}-${major}`}
        class="flex select-none border-2 items-center cursor-pointer active:scale-95 transition-transform duration-75 peer-checked:text-(--w-text) bg-light-ui/30 peer-checked:bg-(--w-bg)/5 text-light-tx-2 text-shadow-2xs text-shadow-light-tx-3/30 px-3 rounded-2xl border-dashed peer-checked:border-solid border-light-ui-3 peer-checked:border-(--w-border)/60 peer-checked:shadow-inner peer-checked:shadow-light-ui/30 peer-checked:shadow-offset-0 peer-checked:shadow-radius-0 peer-checked:shadow-color-light-ui/30"
      >
        <span class="label-text"
          >{major.at(0)?.toUpperCase() + major.slice(1)}</span
        >
      </label>
    </div>
  {/each}
</div>
