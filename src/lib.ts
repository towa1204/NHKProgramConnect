import { ProgramListReq } from './internal/types.js';
import { findPrograms, getProgramListURI } from './internal/common.js';
import { fetchNHKProgramNode } from './internal/runtime/node.js';
import { fetchNHKProgramGAS } from './internal/runtime/gas.js';

export async function fetchProgramNode(subProgramTitles: string[], reqParam: ProgramListReq) {
  const uri = getProgramListURI(reqParam);
  const programs = await fetchNHKProgramNode(uri);
  const result = findPrograms(subProgramTitles, programs);
  return result;
}

export function fetchProgramGAS(subProgramTitles: string[], reqParam: ProgramListReq) {
  const uri = getProgramListURI(reqParam);
  const programs = fetchNHKProgramGAS(uri);
  return findPrograms(subProgramTitles, programs);
}

export function fetchProgramWeeklyGAS(subProgramTitles: string[], reqParam: ProgramListReq) {
  // reqParamを変化させてfetchProgramGASを実行する
  // 配列を順序関係を持たせて結合。その配列を返す
}
