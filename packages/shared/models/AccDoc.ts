export enum AccDocType {
}
export interface IAccDoc {
  id: number;
  // 公司ID
  cid: number;
  // 单据类型
  type: AccDocType;
  // 单据详情
  detail: string;
  // 原始资源的ID(比如办卡的话, 关联的就是订单表表)
  srcId: number;
  // 录入人
  uid: number;
  // 录入时间
  created: Date;
  // 生效时间
  effect: Date;
}
