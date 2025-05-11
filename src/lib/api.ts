import { API_URL, CACHE_TIME, REF_ID, USE_MOCK_DATA } from './constant';
import type { ApiHomeworkReponse } from './types';
import { mockResponse } from './mock'

export async function getCandidates(): Promise<ApiHomeworkReponse> {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockResponse);
  }

  if (window && window.localStorage) {
    const lastUpdated = window.localStorage.getItem('lastUpdated');
    const candidates = window.localStorage.getItem('candidates');
    if (candidates && lastUpdated) {
      const now = new Date();
      const lastUpdatedDate = new Date(lastUpdated);
      const diffInMinutes = Math.floor((now.getTime() - lastUpdatedDate.getTime()) / 60 * 1000);
      if (diffInMinutes < CACHE_TIME) {
        return Promise.resolve(JSON.parse(candidates));
      }
    }
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
    if (window && window.localStorage) {
      window.localStorage.setItem('candidates', JSON.stringify(data));
      window.localStorage.setItem('lastUpdated', new Date().toISOString());
    }
    return data;
  }).catch((error) => {
    console.error('Error fetching data:', error);
    throw error;
  });
}