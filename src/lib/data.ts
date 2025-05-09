import { getCandidates } from "./api"
import MiniSearch from 'minisearch'

export async function getCandidateList() {
  const response = await getCandidates();
  const candidateList = Object.values(response).flat().map((candidate) => {
    return {
      ...candidate,
      interviewRefNo: candidate.interviewRefNo.toUpperCase(),
    }
  })
  return candidateList.map((candidate, index) => {
    return {
      ...candidate,
      id: index,
    }
  })
}

export async function getIndexedContent() {
  const miniSearch = new MiniSearch({
    fields: [
      'firstName',
      'lastName',
      'interviewRefNo',
    ],
  })

  miniSearch.addAll(await getCandidateList());
  return miniSearch
}

export async function searchCandidate(query: string) {
  const miniSearch = await getIndexedContent()
  const results = miniSearch.search(query, {
    fuzzy: 0.2,
    prefix: true,
    boost: {
      firstName: 2,
      lastName: 2,
      interviewRefNo: 1,
    },
  })
  return results
}