import { Program, ProgramListReq, ProgramListRes } from './types.js';

export function getProgramListURI(reqParam: ProgramListReq) {
  const formattedDate = convertNHKDate(reqParam.date);
  return `https://api.nhk.or.jp/v2/pg/list/${reqParam.area}/${reqParam.service}/${formattedDate}.json?key=${reqParam.apikey}`;
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

// 与えられたDateオブジェクトの次の日のDateオブジェクトを返す
export function getNextDate(date: Date) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);
  return nextDate;
}

// 与えられたDateオブジェクトの日付から1週間分の日付のDateオブジェクトの配列を返す
export function getWeekDates(date: Date) {
  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(date);
    date = getNextDate(date);
  }
  return weekDates;
}

// 与えられたDateオブジェクトの日付をYYYY-MM-DD形式で返す
export function convertNHKDate(date: Date) {
  const formattedDate = date
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .join('-');
  return formattedDate;
}
