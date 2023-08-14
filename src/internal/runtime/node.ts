import fetch from 'node-fetch';
import { NetworkAccessError, ResponseError } from '../exception.js';
import { ProgramListRes } from '../types';

export async function fetchNHKProgramNode(url: string) {
  let res = null;
  try {
    res = await fetch(url);
  } catch (error) {
    throw new NetworkAccessError('サーバ接続不可');
  }
  if (!res.ok) {
    if (res.status === 400) {
      throw new ResponseError(res.status, '無効なパラメータ');
    } else if (res.status === 401) {
      throw new ResponseError(res.status, '無効なAPIKey');
    } else {
      const errorMessage = await res.text();
      throw new ResponseError(res.status, `エラー：${errorMessage}`);
    }
  }
  const programs = (await res.json()) as ProgramListRes;
  return programs;
}
