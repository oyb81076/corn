export enum CompanyType {
  // 瑜伽
  YOGA = "yoga",
  // 健身房
  GYM = "gym",
}

export interface ICompany {
  id: number;
  type: CompanyType;
  masterId: number;
}
