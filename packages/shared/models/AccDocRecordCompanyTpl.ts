// 借贷
export enum DC {
  // 借
  dr = 0,
  // 贷
  cr = 1,
}
/**
 * 公司的模版
 */
export interface IAccDocRecordCompanyTpl {
  id: number;
  // 凭证模版ID
  docId: number;
  // 借/贷
  dc: DC;
  // 金额 (单位:分)
  amount: number;
  // 默认文字
  detail: string;
}
