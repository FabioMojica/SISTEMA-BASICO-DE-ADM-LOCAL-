import { useState } from "react";
import { addProductRequest } from "../../api/products";
import AlertDialog from "../AlertDialog";

const ProductForm = ({ product, onProductChange }) => {
  const [form, setForm] = useState(product);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageInputKey, setImageInputKey] = useState(Date.now()); // Key to reset file input

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files[0]) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          setForm({ ...form, image: file });
          setImagePreview(URL.createObjectURL(file)); // Vista previa de la imagen
        } else {
          // Limpiar el campo de archivo si el archivo no es una imagen
          setImageInputKey(Date.now()); // Reset input value
          alert("Por favor, selecciona un archivo de imagen.");
        }
      } else {
        setImagePreview(null);
        setForm({ ...form, image: null });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    onProductChange({ ...form, [name]: name === "image" ? files[0] : value });
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", image: null });
    setImagePreview(null); // Limpiar vista previa de la imagen
    setImageInputKey(Date.now()); // Reset input value
    onProductChange({ name: "", price: "", image: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await addProductRequest(formData);
      console.log(res);
      setAlertMessage(`El producto ${res.data.name} fue añadido a tus productos con éxito`);
      setShowAlert(true);
      
      // Limpiar el formulario y la vista previa después de una solicitud exitosa
      setForm({ name: "", price: "", image: null });
      setImagePreview(null);
      setImageInputKey(Date.now()); // Reset input value
      onProductChange({ name: "", price: "", image: null });
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid = form.name && form.price;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen <span className="text-gray-500">(Opcional)</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            accept="image/*" // Solo aceptar imágenes
            key={imageInputKey} // Reset input value
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Vista previa" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md ${
              isFormValid
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={!isFormValid}
          >
            Agregar Producto
          </button>
        </div>
      </form>

      {showAlert && (
        <AlertDialog 
          message={alertMessage} 
          onConfirm={() => setShowAlert(false)} 
        />
      )}
    </div>
  );
};

export default ProductForm;
