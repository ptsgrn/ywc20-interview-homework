export type InterviewRefNoPrefix = "DS" | "MK" | "PG" | "CT";
export type MajorKey = "design" | "marketing" | "programming" | "content";
export type Major = `web_${MajorKey}`;

export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  interviewRefNo: `${InterviewRefNoPrefix}${number}`;
  major: Major;
}

export type ApiHomeworkReponse = {
  [x in MajorKey]: Candidate[];
};
