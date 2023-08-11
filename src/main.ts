import fetch from 'node-fetch';
import { ProgramListReq } from './api-types';

async function fetchNHKProgramNode(url: string) {
  const res = await fetch(url);
  const programs = await res.json();
  return programs;
}

async function fetchProgramDaily(
  subscribePrograms: string[],
  reqParam: ProgramListReq,
  NHKAPIFetch: (url: string) => Promise<unknown>
) {
  const url = `https://api.nhk.or.jp/v2/pg/list/${reqParam.area}/${reqParam.service}/${reqParam.date}.json?key=${reqParam.apikey}`;
  const res = await NHKAPIFetch(url);
  console.log(res);
}

export async function fetchProgramDailyNode(subscribePrograms: string[], reqParam: ProgramListReq) {
  await fetchProgramDaily(subscribePrograms, reqParam, fetchNHKProgramNode);
}
