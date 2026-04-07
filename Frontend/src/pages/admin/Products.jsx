import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { useStats } from '../../context/StatsContext';
import { toast } from 'react-hot-toast';
import { createProduct, updateProduct } from '../../service/productService';
import { adminProductsStyles, adminShellStyles } from './Tailwind/AdminTailwind';

const createEmptyProduct = () => ({
  name: '',
  img: '',
  price: '',
  description: '',
  smallDes: '',
  category: '',
  isActive: true,
});

const productFields = [
  'name',
  'img',
  'price',
  'description',
  'smallDes',
  'category',
  'isActive',
  'rent',
];

const buildProductFormData = (product, imageFile) => {
  const formData = new FormData();

  productFields.forEach((field) => {
    if (field === 'img' && imageFile) {
      return;
    }

    const value = product[field];

    if (value !== undefined && value !== null && value !== '') {
      formData.append(field, value);
    }
  });

  if (imageFile) {
    formData.append('img', imageFile);
  }

  return formData;
};

function Products() {
  const { stats } = useStats();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newProduct, setNewProduct] = useState(createEmptyProduct);
  const [selectedProduct, setSelectedProduct] = useState(createEmptyProduct);
  const [newImageFile, setNewImageFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    if (stats.product) {
      setProducts([...stats.product]);
    }
  }, [stats.product]);

  const handleInputChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setNewImageFile(file);
  };

  const handleSelectedImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImageFile(file);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
    setNewProduct(createEmptyProduct());
    setNewImageFile(null);
  };

  const closeEditModal = () => {
    setOpen(false);
    setSelectedImageFile(null);
  };

  const handleActivate = async (productID) => {
    try {
      const currentProduct = products.find((p) => (p._id || p.id) === productID);
      if (!currentProduct) return;

      const updatedStatus = !currentProduct.isActive;
      await updateProduct(productID, { isActive: updatedStatus });

      setProducts((prev) =>
        prev.map((item) =>
          (item._id || item.id) === productID ? { ...item, isActive: updatedStatus } : item,
        ),
      );
      toast.success(`Product Details Updated`);
    } catch (error) {}
  };

  const handleEdit = async () => {
    try {
      const payload = buildProductFormData(selectedProduct, selectedImageFile);
      const updatedProduct = await updateProduct(
        selectedProduct._id || selectedProduct.id,
        payload,
      );

      setProducts((prev) =>
        prev.map((item) =>
          (item._id || item.id) === (selectedProduct._id || selectedProduct.id)
            ? updatedProduct
            : item,
        ),
      );
      closeEditModal();
      toast.success(`Product Details Updated`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      if (!newImageFile) {
        toast.error(`Please select a product image`);
        return;
      }

      const payload = buildProductFormData(newProduct, newImageFile);
      const createdProduct = await createProduct(payload);

      setProducts((prev) => [...prev, createdProduct]);
      closeAddModal();
      toast.success(`Product Added Succesfully`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={adminShellStyles.page}>
        <SideBar />

        <div className={adminProductsStyles.content}>
          <div className={adminProductsStyles.header}>
            <h1 className={adminProductsStyles.title}>All Products</h1>
            <button
              onClick={() => {
                setNewProduct(createEmptyProduct());
                setNewImageFile(null);
                setIsAddOpen(true);
              }}
              className={adminProductsStyles.addButton}
            >
              + Add Product
            </button>
          </div>

          <div className={adminProductsStyles.grid}>
            {products.map((item) => (
              <div key={item._id || item.id} className={adminProductsStyles.card}>
                <div className={adminProductsStyles.imageWrap}>
                  <img src={item.img} alt={item.name} className={adminProductsStyles.image} />
                </div>
                <div className={adminProductsStyles.metaRow}>
                  <div>
                    <h2 className={adminProductsStyles.name}>{item.name}</h2>
                    <p className={adminProductsStyles.productId}>
                      Product ID: {item._id || item.id}
                    </p>
                  </div>
                  <span className={adminProductsStyles.statusBadge(item.isActive)}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className={adminProductsStyles.details}>
                  <p>
                    <span className={adminProductsStyles.detailLabel}>Price:</span> ₹{item.price}
                  </p>
                  <p>
                    <span className={adminProductsStyles.detailLabel}>Category:</span>{' '}
                    {item.category}
                  </p>
                </div>

                <div className={adminProductsStyles.actionRow}>
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setSelectedImageFile(null);
                      setOpen(true);
                    }}
                    className={adminProductsStyles.editButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      handleActivate(item._id || item.id);
                    }}
                    className={adminProductsStyles.toggleButton}
                  >
                    {item.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {open && (
          <div className={adminProductsStyles.modalOverlay}>
            <div className={adminProductsStyles.modalCard}>
              <div className={adminProductsStyles.modalHeader}>
                <h2 className={adminProductsStyles.modalTitle}>EDIT PRODUCT</h2>
                <button onClick={closeEditModal} className={adminProductsStyles.modalClose}>
                  ✕
                </button>
              </div>

              <div className={adminProductsStyles.formGrid}>
                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                    className={adminProductsStyles.input}
                  />
                </div>

                <div>
                  <label className={adminProductsStyles.label}>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                    className={adminProductsStyles.input}
                  />
                </div>

                <div>
                  <label className={adminProductsStyles.label}>Category</label>
                  <select
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                    className={adminProductsStyles.select}
                  >
                    <option value="">Select category</option>
                    <option value="Acer">Acer</option>
                    <option value="Dell">Dell</option>
                    <option value="Asus">Asus</option>
                    <option value="Lenovo">Lenovo</option>
                  </select>
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectedImageChange}
                    className={adminProductsStyles.input}
                  />
                  <p className={adminProductsStyles.productId}>
                    Leave this empty to keep the current image.
                  </p>
                  {selectedProduct.img && (
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                      className={adminProductsStyles.image}
                    />
                  )}
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Small Description</label>
                  <textarea
                    rows="2"
                    name="smallDes"
                    value={selectedProduct.smallDes}
                    onChange={handleInputChange}
                    className={adminProductsStyles.textarea}
                  ></textarea>
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Description</label>
                  <textarea
                    rows="4"
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                    className={adminProductsStyles.textarea}
                  ></textarea>
                </div>
              </div>

              <div className={adminProductsStyles.modalActions}>
                <button
                  className={adminProductsStyles.primaryButton}
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddOpen && (
          <div className={adminProductsStyles.modalOverlay}>
            <div className={adminProductsStyles.modalCard}>
              <div className={adminProductsStyles.modalHeader}>
                <h2 className={adminProductsStyles.modalTitle}>ADD NEW PRODUCT</h2>
                <button onClick={closeAddModal} className={adminProductsStyles.modalClose}>
                  ✕
                </button>
              </div>

              <div className={adminProductsStyles.formGrid}>
                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    className={adminProductsStyles.input}
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                  />
                </div>

                <div>
                  <label className={adminProductsStyles.label}>Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    className={adminProductsStyles.input}
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                  />
                </div>

                <div>
                  <label className={adminProductsStyles.label}>Category</label>
                  <select
                    name="category"
                    className={adminProductsStyles.select}
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                  >
                    <option value="">Select category</option>
                    <option value="Acer">Acer</option>
                    <option value="Dell">Dell</option>
                    <option value="Asus">Asus</option>
                    <option value="Lenovo">Lenovo</option>
                  </select>
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageChange}
                    className={adminProductsStyles.input}
                  />
                  {newImageFile && (
                    <p className={adminProductsStyles.productId}>
                      Selected file: {newImageFile.name}
                    </p>
                  )}
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Small Description</label>
                  <textarea
                    rows="2"
                    name="smallDes"
                    placeholder="Tell us samll about the product..."
                    className={adminProductsStyles.textarea}
                    value={newProduct.smallDes}
                    onChange={handleNewProductChange}
                  ></textarea>
                </div>

                <div className={adminProductsStyles.span2}>
                  <label className={adminProductsStyles.label}>Description</label>
                  <textarea
                    rows="4"
                    name="description"
                    placeholder="Tell us about the product..."
                    className={adminProductsStyles.textarea}
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                  ></textarea>
                </div>
              </div>

              <div className={adminProductsStyles.modalActions}>
                <button onClick={closeAddModal} className={adminProductsStyles.secondaryButton}>
                  Cancel
                </button>
                <button
                  className={adminProductsStyles.createButton}
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
