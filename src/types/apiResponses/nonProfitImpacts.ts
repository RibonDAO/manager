export interface CreateNonProfitImpacts {
  id?: string;
  endDate?: string;
  startDate?: string;
  usdCentsToOneImpactUnit?: string;
  measurementUnit?: string;
  impactDescription?: string;
  donorRecipient?: string;
  minimumNumberOfTickets?: number;
}
