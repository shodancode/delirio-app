import * as React from "react";
import { GetStaticProps } from "next";
import { Product } from "../product/types";
import productApi from "../product/api";
import cartApi from "../cart/api";
import StoreScreen from "../product/screens/Store";
import { Field } from "../cart/types";
import CartProvider from "../cart/context";
import Layout from "../components/layout";
import Banner from "../components/banner";
interface Props {
  products: Product[];
  fields: Field[];
}

const IndexRoute: React.FC<Props> = ({ products, fields }) => {
  return (
    <Layout title={"Otros"}>
      <Banner banner={"/banner/otros.png"} />
      <CartProvider fields={fields}>
        <StoreScreen
          fields={fields}
          products={products.filter(
            (products) => products.category === "otros"
          )}
        />
      </CartProvider>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();

  return {
    props: {
      products,
      fields,
    },
    revalidate: 100,
  };
};

export default IndexRoute;
