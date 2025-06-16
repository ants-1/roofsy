export interface Property {
  id: number;
  details: string;
  beds: number;
  baths: number;
  receptions: number;
  "property-type": string;
  status: string;
  price: number;
  address: string;
  postcode: string;
  agent: string;
  imgs: string[];
  "feature-img": string;
}
