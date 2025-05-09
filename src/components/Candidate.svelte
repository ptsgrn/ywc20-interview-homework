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
  class="flex flex-row gap-3 shadow-sm border-2 border-gray-700/30 rounded-lg p-2 data-[major=web\_design]:border-red-400/50 group data-[major=web\_design]:bg-red-400/10 data-[major=web\_marketing]:border-blue-400/50 data-[major=web\_marketing]:bg-blue-400/10 data-[major=web\_programming]:border-green-400/50 data-[major=web\_programming]:bg-green-400/10 data-[major=web\_content]:border-magenta-400/50 data-[major=web\_content]:bg-magenta-400/10"
>
  <div
    class="icon size-12 bg-light-bg shrink-0 flex items-center justify-center text-lg border-2 rounded-sm transition-transform duration-100 ease-in-out shadow-inner select-none {candidate.major ===
    'web_design'
      ? 'border-red-400/40'
      : ''} {candidate.major === 'web_content'
      ? 'border-magenta-400/40'
      : ''} {candidate.major === 'web_marketing'
      ? 'border-blue-400/40'
      : ''} {candidate.major === 'web_programming'
      ? 'border-green-400/40'
      : ''}"
  >
    {emojis[candidate.major]}
  </div>
  <div class="flex flex-col items-start justify-start w-full">
    <div>
      {candidate.firstName}
      {candidate.lastName}
    </div>
    <div class="text-sm text-gray-500">
      <code>
        #{candidate.interviewRefNo}
      </code>
      {formatMajor(candidate.major)}
    </div>
  </div>
</div>
