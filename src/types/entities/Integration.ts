export default interface Integration {
  id: number;
  name: string;
  walletAddress: string;
  url: string;
  logo: string;
  integrationAddress: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
