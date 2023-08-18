import { NetworkAccessError, ResponseError } from '../exception.js';
import { ProgramListRes } from '../types.js';

export function fetchNHKProgramGAS(url: string) {
  let res = null;
  try {
    res = UrlFetchApp.fetch(url, { muteHttpExceptions: false });
  } catch (error) {
    throw new NetworkAccessError('サーバ接続不可');
  }
  const statusCode = res.getResponseCode();

  let programs = null;
  if (statusCode >= 200 && statusCode < 300) {
    programs = JSON.parse(res.getContentText()) as ProgramListRes;
  } else if (statusCode == 400) {
    throw new ResponseError(statusCode, '無効なパラメータ');
  } else if (statusCode == 401) {
    throw new ResponseError(statusCode, '無効なAPIKey');
  } else {
    const errorMessage = res.getContentText();
    throw new ResponseError(statusCode, `エラー：${errorMessage}`);
  }
  return programs;
}
