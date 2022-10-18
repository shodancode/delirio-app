export interface Option {
  id: string;
  title: string;
  category: string;
  description: string;
  highprice: number;
  image: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  options?: Record<Option["category"], Option[]>;
  price: number;
  highprice: number;
  stock: number;
}
