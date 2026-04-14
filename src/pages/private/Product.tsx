// app/components/Product.tsx
import { useState } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  brandName: string;
  unitName: string;
  description: string;
  createdAt: string;
}

// Sample initial data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "asd",
    brandName: "Splise It",
    unitName: "--",
    description: "asd",
    createdAt: "Jan 12, 2026",
  },
  {
    id: 2,
    name: "Laptop",
    brandName: "Dell",
    unitName: "Piece",
    description: "High performance laptop",
    createdAt: "Jan 15, 2026",
  },
  {
    id: 3,
    name: "Mouse",
    brandName: "Logitech",
    unitName: "Piece",
    description: "Wireless mouse",
    createdAt: "Jan 18, 2026",
  },
];

export default function Product() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add Product
  const handleAddProduct = (data: any) => {
    const newProduct: Product = {
      id: Date.now(),
      name: data.name,
      brandName: data.brandName,
      unitName: data.unitName || "--",
      description: data.description,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    
    setProducts([...products, newProduct]);
    toast.success("Product added successfully!");
    setModalType(null);
  };

  // Handle Edit Product
  const handleEditProduct = (data: any) => {
    if (selectedProduct) {
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: data.name || product.name,
                brandName: data.brandName || product.brandName,
                unitName: data.unitName || product.unitName,
                description: data.description || product.description,
              }
            : product
        )
      );
      toast.success("Product updated successfully!");
      setModalType(null);
      setSelectedProduct(null);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      toast.success("Product deleted successfully!");
      setModalType(null);
      setSelectedProduct(null);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setSelectedProduct(null);
    setModalType("addProduct");
  };

  // Open Edit Modal
  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setModalType("addProduct");
  };

  // Open Delete Modal
  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setModalType("deleteConfirm");
  };

  // Open View Modal
  const openViewModal = (product: Product) => {
    setSelectedProduct(product);
    setModalType("viewProduct");
  };

  // Get modal data
  const getModalData = () => {
    if (modalType === "addProduct" && selectedProduct) {
      return {
        name: selectedProduct.name,
        brandName: selectedProduct.brandName,
        unitName: selectedProduct.unitName,
        description: selectedProduct.description,
      };
    }
    if (modalType === "deleteConfirm" && selectedProduct) {
      return { title: selectedProduct.name };
    }
    if (modalType === "viewProduct" && selectedProduct) {
      return selectedProduct;
    }
    return {};
  };

  // Handle modal confirm
  const handleModalConfirm = (data: any) => {
    if (modalType === "addProduct") {
      if (selectedProduct) {
        handleEditProduct(data);
      } else {
        handleAddProduct(data);
      }
    } else if (modalType === "deleteConfirm") {
      handleDeleteProduct();
    } else if (modalType === "viewProduct") {
      setModalType(null);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openAddModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Unit Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No products found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brandName}</TableCell>
                    <TableCell>{product.unitName}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(product)}
                          className="h-8 w-8 p-0 text-blue-600"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(product)}
                          className="h-8 w-8 p-0"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(product)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <CommonModal
        open={modalType === "addProduct"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedProduct(null);
        }}
        type="addProduct"
        data={getModalData()}
        onConfirm={handleModalConfirm}
      />

      {/* Delete Confirmation Modal */}
      <CommonModal
        open={modalType === "deleteConfirm"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedProduct(null);
        }}
        type="deleteConfirm"
        data={{ title: selectedProduct?.name }}
        onConfirm={handleDeleteProduct}
      />

      {/* View Product Modal */}
      <CommonModal
        open={modalType === "viewProduct"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedProduct(null);
        }}
        type="viewProduct"
        data={getModalData()}
        onConfirm={() => {
          setModalType(null);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}