import { Program, ProgramListReq } from './internal/types.js';
import { findPrograms, getProgramListURI, getWeekDates } from './internal/common.js';
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
  const subscribeWeekPrograms: Program[] = [];

  const weekDates = getWeekDates(reqParam.date);
  for (const date of weekDates) {
    reqParam.date = date;
    const programs = fetchProgramGAS(subProgramTitles, reqParam);
    subscribeWeekPrograms.push(...programs);
  }

  return subscribeWeekPrograms;
}
