export interface Property {
  id: string;
  owner_id: string;
  price: number;
  imgs: string[];
  beds: number;
  baths: number;
  receptions: number;
  property_type: string;
  property_status: "Sale" | "Rent" | "Sold" | string;
  details: string;
  property_address: string;
  postcode: string;
  agent: string;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "User" | "Agent";
}

export interface Agents {
  id: string;
  name: string;
  email: string;
  phone: string;
}