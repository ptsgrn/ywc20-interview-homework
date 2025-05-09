import { getCandidates } from "./api"
import MiniSearch from 'minisearch'
import type { Candidate, Major, MajorKey } from './types';

export async function getCandidateList(selectedMajors: string[] = []) {
  const response = await getCandidates();
  const majors = Object.keys(response) as MajorKey[]
  const candidateList = Object.values(response).flat()
  return {
    candidateList: candidateList.map((candidate, index) => {
      return {
        ...candidate,
        id: index,
      }
    }).filter((result) => {
      if (selectedMajors.length === 0) {
        return true
      }
      return selectedMajors.includes(result.major.replace("web_", ""))
    }),
    majors
  }
}

export async function getIndexedContent() {
  const miniSearch = new MiniSearch({
    fields: [
      'firstName',
      'lastName',
      'interviewRefNo',
    ],
  })

  miniSearch.addAll((await getCandidateList()).candidateList);
  return miniSearch
}

export async function searchCandidate(query: string, candidateList: Candidate[], selectedMajors: string[] = []) {
  const miniSearch = await getIndexedContent()
  const results = miniSearch.search(query, {
    fuzzy: 0.2,
    prefix: true,
    boost: {
      firstName: 2,
      lastName: 2,
      interviewRefNo: 1,
    },
    filter(result) {
      if (selectedMajors.length === 0) {
        return true
      }
      const candidate = candidateList[result.id]
      return selectedMajors.includes(candidate.major.replace("web_", ""))
    },
  })
  return results
}