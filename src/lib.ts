import { ProgramListReq } from './internal/types';
import { fetchProgram } from './internal/common.js';
import { fetchNHKProgramNode } from './internal/runtime/node.js';

export async function fetchProgramNode(subProgramTitles: string[], reqParam: ProgramListReq) {
  await fetchProgram(subProgramTitles, reqParam, fetchNHKProgramNode);
}
