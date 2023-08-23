import { Program, ProgramListReq, UserProgramListReq } from './internal/types.js';
import { findPrograms, getProgramListURI, getWeekDates } from './internal/common.js';
import { fetchNHKProgramNode } from './internal/runtime/node.js';
import { fetchNHKProgramGAS } from './internal/runtime/gas.js';

export async function fetchProgramNode(subProgramTitles: string[], userReqParam: UserProgramListReq) {
  const reqParams = userReqParam.services.map((service) => {
    const reqParam: ProgramListReq = {
      area: userReqParam.area,
      service: service,
      date: userReqParam.date,
      apikey: userReqParam.apikey,
    };
    return reqParam;
  });

  const subscribePrograms: Program[] = [];
  for (const reqParam of reqParams) {
    const uri = getProgramListURI(reqParam);
    const programs = await fetchNHKProgramNode(uri);
    const filteredPrograms = findPrograms(subProgramTitles, programs);
    subscribePrograms.push(...filteredPrograms);
  }
  return subscribePrograms;
}

export function fetchProgramGAS(subProgramTitles: string[], userReqParam: UserProgramListReq) {
  const reqParams = userReqParam.services.map((service) => {
    const reqParam: ProgramListReq = {
      area: userReqParam.area,
      service: service,
      date: userReqParam.date,
      apikey: userReqParam.apikey,
    };
    return reqParam;
  });

  const subscribePrograms: Program[] = [];
  for (const reqParam of reqParams) {
    const uri = getProgramListURI(reqParam);
    const programs = fetchNHKProgramGAS(uri);
    const filteredPrograms = findPrograms(subProgramTitles, programs);
    subscribePrograms.push(...filteredPrograms);
  }
  return subscribePrograms;
}

export function fetchProgramWeeklyGAS(subProgramTitles: string[], reqParam: UserProgramListReq) {
  const subscribeWeekPrograms: Program[] = [];

  const weekDates = getWeekDates(reqParam.date);
  for (const date of weekDates) {
    reqParam.date = date;
    const programs = fetchProgramGAS(subProgramTitles, reqParam);
    subscribeWeekPrograms.push(...programs);
  }

  return subscribeWeekPrograms;
}
