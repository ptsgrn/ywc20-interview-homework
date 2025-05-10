<script lang="ts">
  import type { Candidate, Major } from "../lib/types";

  const {
    candidate,
  }: {
    candidate: Candidate;
  } = $props();

  const emojis = {
    web_design: "🎨",
    web_marketing: "📈",
    web_programming: "💻",
    web_content: "📝",
  };

  function formatMajor(major: Major) {
    return major
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
</script>

<div
  data-major={candidate.major}
  class="flex flex-row gap-3 shadow-sm border-2 rounded-xl p-1.5 border-(--w-border)/60 bg-(--w-bg)/10"
>
  <div
    class="size-12 text-shadow-xs bg-light-bg/90 border-(--w-border)/30 shrink-0 flex items-center justify-center text-lg border-2 rounded-md transition-transform duration-100 ease-in-out shadow-inner select-none"
  >
    {emojis[candidate.major]}
  </div>
  <div
    class="flex flex-col text-shadow-white/70 items-start justify-start w-full text-(--w-text) text-shadow-2xs"
  >
    <div>
      {candidate.firstName}
      {candidate.lastName}
    </div>
    <div class="text-xs text-gray-700/70">
      <code>
        #{candidate.interviewRefNo}
      </code>
      {formatMajor(candidate.major)}
    </div>
  </div>
</div>
