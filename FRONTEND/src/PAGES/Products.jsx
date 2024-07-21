import { useAuth } from "../COMPONENTS/AuthContext";

const Products = () => {
    const { getProducts } = useAuth();


    return (
        <div>
            Hola
        </div>
    )
}

export default Products
