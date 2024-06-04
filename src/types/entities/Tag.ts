export default interface Tag {
  id?: number;
  name: string;
  status: string;
  nonProfitIds?: number[];
  nonProfits?: any[];
}
