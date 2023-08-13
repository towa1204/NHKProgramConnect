import fetch from 'node-fetch';
import { ProgramListReq, ProgramListRes, Program } from './api-types';

export async function fetchNHKProgramNode(url: string) {
  const res = await fetch(url);
  console.log(res.status); //
  const programs = await res.json();
  return programs;
}

async function fetchProgram(
  subProgramTitles: string[],
  reqParam: ProgramListReq,
  NHKAPIFetch: (url: string) => Promise<unknown>
) {
  const url = `https://api.nhk.or.jp/v2/pg/list/${reqParam.area}/${reqParam.service}/${reqParam.date}.json?key=${reqParam.apikey}`;
  const res = (await NHKAPIFetch(url)) as ProgramListRes;
  // ここらへんでエラー処理
  return findPrograms(subProgramTitles, res);
}

export function findPrograms(subProgramTitles: string[], programs: ProgramListRes) {
  const allServicePrograms = programs.list;
  let subPrograms: Program[] = [];

  // サービスの数(NHK総合, NHK Eテレ...)だけループを回す
  Object.keys(allServicePrograms).forEach((key) => {
    const filteredPrograms = allServicePrograms[key].filter((program) => {
      // subProgramTitlesのいずれかの文字列をタイトルに含んでいれば抜き出す
      return subProgramTitles.some((programName) => program.title.includes(programName));
    });
    subPrograms = subPrograms.concat(filteredPrograms);
  });
  console.log(subPrograms);
  return subPrograms;
}

export async function fetchProgramNode(subProgramTitles: string[], reqParam: ProgramListReq) {
  await fetchProgram(subProgramTitles, reqParam, fetchNHKProgramNode);
}
