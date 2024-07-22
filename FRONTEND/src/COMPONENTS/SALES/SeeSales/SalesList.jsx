import Sale from "./Sale";

const SalesList = ({ sales }) => {
  return (
    <div className="space-y-4">
      {sales.map(sale => (
        <Sale key={sale._id} sale={sale} />
      ))}
    </div>
  );
};

export default SalesList;
