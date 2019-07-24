/**
 * 会计凭证模版
 */
export interface IAccDocCompanyTpl {
  id: number;
  // 源自xxxx
  copyId: number;
  // 公司ID
  cid: number;
  // 详情
  detail: string;
  // 录入时间
  created: Date;
  // 录入人
  uid: number;
}
