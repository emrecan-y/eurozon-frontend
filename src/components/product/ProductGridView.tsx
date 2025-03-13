import { Product } from "@/models/product";

type ProductGridViewProps = {
  product?: Product;
};

function ProductGridView({ product }: ProductGridViewProps) {
  if (product) {
    return <div></div>;
  } else {
    return <div className="h-52 w-36 bg-gray-500 md:h-72 md:w-48"></div>;
  }
}

export default ProductGridView;
