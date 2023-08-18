import { Program, ProgramListReq, ProgramListRes } from './types.js';

export function getProgramListURI(reqParam: ProgramListReq) {
  return `https://api.nhk.or.jp/v2/pg/list/${reqParam.area}/${reqParam.service}/${reqParam.date}.json?key=${reqParam.apikey}`;
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
  return subPrograms;
}
