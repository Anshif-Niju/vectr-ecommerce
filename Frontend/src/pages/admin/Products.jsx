import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { useStats } from '../../context/StatsContext';
import api from '../../service/api';
import {toast} from 'react-hot-toast';


function Products() {
  const { stats } = useStats();
  const [products, setProducts] = useState(stats.product || []);
  const [open, setOpen] = useState(false);
  const [activate, setActivate] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    img: '',
    price: '',
    description: '',
    smallDes: '',
    category: '',
    isActive: true,
  });
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    img: '',
    price: '',
    description: '',
    smallDes: '',
    category: '',
    isActive: true,
  });

  useEffect(() => {
    if (stats.product) {
      setProducts(stats.product);
    }
  }, [stats.product]);

  const handleInputChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleActivate = async (productID) => {
    try {
      const currentProduct = products.find((p) => p.id === productID);
      if (!currentProduct) return;

      const updatedStatus = !currentProduct.isActive;
      await api.patch(`/products/${productID}`, {
        isActive: updatedStatus,
      });

      setProducts((prev) =>
        prev.map((item) =>
          item.id == productID ? { ...item, isActive: updatedStatus } : item,
        ),
      );
      setActivate(!activate);
      toast.success(`Product Details Updated`)
    } catch (error) {}
  };

  const handleEdit = async () => {
    try {
      const res = await api.patch(
        `/products/${selectedProduct.id}`,
        selectedProduct,
      );

      setProducts((prev) =>
        prev.map((item) => (item.id === selectedProduct.id ? res.data : item)),
      );
      setOpen(false);
      toast.success(`Product Details Updated`)
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post(`/products`, newProduct);

      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({
        name: '',
        img: '',
        price: '',
        description: '',
        smallDes: '',
        category: '',
        isActive: true,
      });
      setIsAddOpen(false);
      toast.success(`Product Added Succesfully`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
        <SideBar />

        <div className="flex-1 min-h-screen bg-[#0f172a] p-8 text-white">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All Products</h1>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold transition"
            >
              + Add Product
            </button>{' '}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700/50 hover:scale-[1.02] transition"
              >
                <div className="h-48 w-full bg-slate-700 relative overflow-hidden group">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between my-3 items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400">
                      {item.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Product ID: {item.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-400">Price:</span>{' '}
                    ₹{item.price}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-400">
                      Category:
                    </span>{' '}
                    {item.category}
                  </p>
                </div>

                <div className="mt-5 flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      handleActivate(item.id);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    {item.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 w-[650px] max-w-full rounded-2xl shadow-2xl p-8 relative border border-slate-700 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">
                  EDIT PRODUCT
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-slate-400">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <select
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  >
                    <option value="acer">Acer</option>
                    <option value="dell">Dell</option>
                    <option value="asus">Asus</option>
                    <option value="lenovo">Lenovo</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400">Image URL</label>
                  <input
                    type="text"
                    name="img"
                    value={selectedProduct.img}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea
                    rows="4"
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold text-white"
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 w-[650px] max-w-full rounded-2xl shadow-2xl p-8 relative border border-slate-700 overflow-y-auto max-h-[90vh]">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">
                  ADD NEW PRODUCT
                </h2>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="text-slate-400 hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-slate-400">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <select
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value="Acer">Acer</option>
                    <option value="Dell">Dell</option>
                    <option value="Asus">Asus</option>
                    <option value="Lenovo">Lenovo</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400">
                    Product Image
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, img: e.target.value })
                    }
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400">
                    Small Description
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Tell us samll about the product..."
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        smallDes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about the product..."
                    className="w-full mt-1 p-3 bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold text-white transition"
                >
                  Cancel
                </button>
                <button
                  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 transition"
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
