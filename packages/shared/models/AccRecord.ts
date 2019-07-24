/**
 * 会计记录
 */
export interface IAccRecord {
  id: number;
  // 公司ID
  cid: number;
  // 会计科目编号
  caption: number;
  // 详情(用户手工输入)
  detail: string;
  // 其他信息(系统自动填写的额外信息)
  extras: string;
  // accDoc.id
  docId: number;
}
