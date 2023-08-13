// Program List API リクエストパラメータの型定義
export type ProgramListReq = {
  area: string;
  service: string;
  date: string;
  apikey: string;
};

// Program List API レスポンスの型定義
type Area = {
  id: string;
  name: string;
};

type Logo = {
  url: string;
  width: string;
  height: string;
};

type Service = {
  id: string;
  name: string;
  logo_s: Logo;
  logo_m: Logo;
  logo_l: Logo;
};

export type Program = {
  id: string;
  event_id: string;
  start_time: string;
  end_time: string;
  area: Area;
  service: Service;
  title: string;
  subtitle: string;
  content: string;
  act: string;
  genres: string[];
};

type ServiceProgramList = {
  [key: string]: Program[];
};

export type ProgramListRes = {
  list: ServiceProgramList;
};
