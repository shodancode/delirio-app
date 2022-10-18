import axios from "axios";
import Papa from "papaparse";

import {Option as IOption, Product as IProduct} from "./types";

interface RawOption extends IOption {
  type: "option";
}

interface RawProduct extends IProduct {
  type: "product";
}

class Product implements IProduct {
  id: IProduct["id"];
  title: IProduct["title"];
  category: IProduct["category"];
  description: IProduct["description"];
  image: IProduct["image"];
  options: IProduct["options"];
  price: IProduct["price"];
  highprice: IProduct["highprice"];
  stock: IProduct["stock"];

  constructor() {
    this.options = {} as Product["options"];
  }

  set(product: RawProduct) {
    Object.assign(this, {
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      price: product.price,
      highprice: Number(product.highprice),
      stock: Number(product.stock),
    });
  }

  addOption(option: RawOption) {
    if (!this.options[option.category]) {
      this.options[option.category] = [];
    }

    this.options[option.category].push({
      id: option.id,
      title: option.title,
      category: option.category,
      description: option.description,
      image: option.image,
      price: option.price,
      highprice: Number(option.highprice),
      stock: 0
    });
  }

  toJSON(): IProduct {
    const product = {
      id: this.id,
      title: this.title,
      category: this.category,
      description: this.description,
      image: this.image,
      options: this.options,
      price: this.price,
      highprice: Number(this.highprice),
      stock: Number(this.stock),
    };

    if (Object.keys(product.options).length === 0) {
      delete product.options;
    }

    return product;
  }
}

function normalize(data: (RawProduct | RawOption)[]) {
  const products = new Map<RawProduct["id"], Product>();

  for (const item of data) {
    if (!products.has(item.id)) {
      products.set(item.id, new Product());
    }

    if (item.type === "product") {
      const product = products.get(item.id);

      product.set(item);
    } else if (item.type === "option") {
      const product = products.get(item.id);

      product.addOption(item);
    }
  }

  const normalized: IProduct[] = Object.values(Object.fromEntries(products)).map((product) =>
    product.toJSON(),
  );

  return normalized;
}

export default {
  list: async (): Promise<IProduct[]> => {
    return axios
      .get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTFFhkafmk3Rd1mSSR3Zcfb96xuGWChgDIBlfwYEkgHNct5plKpqaXQxLYj_sXQVKt0t5JzfoK3Tqyi/pub?gid=868330863&single=true&output=csv", {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<IProduct[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const data = normalize(results.data as (RawProduct | RawOption)[]);

                return resolve(data);
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  },
};
