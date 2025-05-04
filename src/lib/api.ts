import { API_URL, REF_ID, USE_MOCK_DATA } from './constant';
import type { ApiHomeworkReponse } from './types';
import { mockResponse } from './mock'

export async function getCandidates(): Promise<ApiHomeworkReponse> {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockResponse);
  }

  return fetch(API_URL, {
    headers: {
      'x-reference-id': REF_ID,
    }
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  }).then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }).catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
}