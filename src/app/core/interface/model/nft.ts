import { NftModel } from './nft-model';
import { User } from './user';

export interface Nft {
  id?: number;
  buyingPrice: number;
  sellingPrice: number;
  featured: boolean;
  token: string;
  inSale: boolean;
  purchaseDate: Date;
  nftModel: NftModel | string;
  user: User | string;
}

export interface PartialNft {
  id?: number;
  buyingPrice?: number;
  sellingPrice?: number;
  token?: string;
  inSale?: boolean;
  purchaseDate?: Date;
  nftModel?: NftModel | string;
  user?: User | string;
}
