import { ProgramListReq } from './internal/types';
import { findPrograms, getProgramListURI } from './internal/common';
import { fetchNHKProgramNode } from './internal/runtime/node';
import { fetchNHKProgramGAS } from './internal/runtime/gas';

export async function fetchProgramNode(subProgramTitles: string[], reqParam: ProgramListReq) {
  const uri = getProgramListURI(reqParam);
  const programs = await fetchNHKProgramNode(uri);
  return findPrograms(subProgramTitles, programs);
}

export function fetchProgramGAS(subProgramTitles: string[], reqParam: ProgramListReq) {
  const uri = getProgramListURI(reqParam);
  const programs = fetchNHKProgramGAS(uri);
  return findPrograms(subProgramTitles, programs);
}
