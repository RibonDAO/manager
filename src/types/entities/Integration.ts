import IntegrationTask from "./IntegrationTask";
import IntegrationWallet from "./IntegrationWallet";

export default interface Integration {
  id?: number;
  name: string;
  integrationWallet?: IntegrationWallet;
  integrationAddress?: string;
  uniqueAddress?: string;
  status: string;
  logo?: any;
  webhookUrl?: string;
  ticketAvailabilityInMinutes: number | null;
  created_at?: string;
  updated_at?: string;
  integrationTaskAttributes?: IntegrationTask | null;
  integrationTask: IntegrationTask | null;
  mobilityAttributes?: string[];
  integrationDeeplinkAddress?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  onboardingTitle?: string;
  onboardingDescription?: string;
  onboardingImage?: any;
}
