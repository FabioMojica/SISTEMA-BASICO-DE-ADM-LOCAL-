const ProductToAdd = ({ name, price, onClick }) => (
  <div
    className="flex flex-col items-center justify-center p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-20 text-center cursor-pointer hover:bg-gray-200"
    onClick={() => onClick(name, price)}
  >
    <span className="text-gray-700 font-medium text-xs">{name}</span>
    <span className="text-gray-500 text-xs">{price.toFixed(2)} Bs.</span>
  </div>
);

export default ProductToAdd;
