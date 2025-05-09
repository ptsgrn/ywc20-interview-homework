<script lang="ts">
  import type { MajorKey } from "../lib/types";

  const uid = $props.id();
  let {
    showOnlyMajor = $bindable([]),
    majors = $bindable([]),
  }: {
    showOnlyMajor: string[];
    majors: MajorKey[];
  } = $props();

  function toggleMajor(major: string) {
    if (showOnlyMajor.includes(major)) {
      showOnlyMajor = showOnlyMajor.filter((m) => m !== major);
    } else {
      showOnlyMajor = [...showOnlyMajor, major];
    }
  }
</script>

<div class="flex flex-row gap-2">
  {#each majors as major}
    <div>
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
        class="flex select-none border-2 items-center cursor-pointer active:scale-95 transition-transform duration-75 text-base-600 border-base-500 px-3 rounded-2xl border-dashed peer-checked:border-solid
        {showOnlyMajor.includes(major) && major === 'design'
          ? 'bg-red-500/10 border-red-500/50 text-red-500'
          : major === 'design'
            ? 'bg-red-50/40 border-red-300 text-red-500/50'
            : ''}
        {showOnlyMajor.includes(major) && major === 'content'
          ? 'bg-magenta-500/10 border-magenta-500/50 text-magenta-500'
          : 'content' === major
            ? 'bg-magenta-50/40 border-magenta-300 text-magenta-500/50'
            : ''}
        {showOnlyMajor.includes(major) && major === 'marketing'
          ? 'bg-blue-500/10 border-blue-500/50 text-blue-500'
          : 'marketing' === major
            ? 'bg-blue-50/40 border-blue-300 text-blue-500/50'
            : ''}
        {showOnlyMajor.includes(major) && major === 'programming'
          ? 'bg-green-500/10 border-green-500/50 text-green-500'
          : 'programming' === major
            ? 'bg-green-50/40 border-green-300 text-green-500/50'
            : ''}
        "
      >
        <span class="label-text"
          >{major.at(0)?.toUpperCase() + major.slice(1)}</span
        >
      </label>
    </div>
  {/each}
</div>
