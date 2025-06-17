// "use client"
// import React, { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import Image from "next/image"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Plus, Pencil, Trash } from "lucide-react"
// import Link from "next/link"
// import axios from 'axios'

// interface Product {
//   id: string
//   name: string
//   price: number
//   quantity: number
//   category: string
//   status: "available" | "out_of_stock"
//   imageUrl: string
// }

// const ProductsPage = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.get('/api/product/allProduct')
//         setProducts(response.data.data)
//         setError(null)
//       } catch (err) {
//         setError('Failed to fetch products')
//         console.error('Error fetching products:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   if (loading) {
//     return <div className="p-6">Loading products...</div>
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">My Products</h1>
//         <Link href="/dashboard/products/create">
//           <Button>
//             <Plus className="w-4 h-4 mr-2" />
//             Add New Product
//           </Button>
//         </Link>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Product Name</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Quantity</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products?.map((product) => (
//               <TableRow key={product.id} className="h-24">
//                 <TableCell className="w-24">
//                   <div className="relative w-20 h-20">
//                     <Image
//                       src={product.imageUrl}
//                       alt={product.name}
//                       fill
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                 </TableCell>
//                 <TableCell className="font-medium">{product.name}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>${product.price.toFixed(2)}</TableCell>
//                 <TableCell>{product.quantity}</TableCell>
//                 <TableCell>
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     product.status === "available" 
//                       ? "bg-green-100 text-green-800" 
//                       : "bg-red-100 text-red-800"
//                   }`}>
//                     {product.status === "available" ? "Available" : "Out of Stock"}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="icon">
//                       <Pencil className="w-4 h-4" />
//                     </Button>
//                     <Button variant="destructive" size="icon">
//                       <Trash className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

// export default ProductsPage
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Product {
  _id: string
  productName: string
  price: number
  quantity: number
  category: string
  image: string
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/product/allProduct')
      setProducts(response.data.data)
      // console.log(response.data.data);
      
      setError(null)
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  
  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await axios.delete(`/api/product/delete/${productId}`)

      if (response.data.success) {
        alert('Product deleted successfully')
        fetchProducts()
      } else {
        alert(response.data.error || 'Failed to delete product')
      }
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('An error occurred while deleting the product')
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setShowUpdateModal(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProduct) return

    try {
      const response = await axios.put(`/api/product/update/${selectedProduct._id}`, {
        productName: selectedProduct.productName,
        category: selectedProduct.category,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
        image: selectedProduct.image
      })

      if (response.data.success) {
        alert('Product updated successfully')
        setShowUpdateModal(false)
        fetchProducts()
      } else {
        alert(response.data.error || 'Failed to update product')
      }
    } catch (err) {
      console.error('Error updating product:', err)
      alert('An error occurred while updating the product')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProduct) return

    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]:
        e.target.name === 'price' || e.target.name === 'quantity'
          ? Number(e.target.value)
          : e.target.value,
    })
  }

  if (loading) return <div className="p-6">Loading products...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link href="/dashboard/products/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={index} className="h-24">
                <TableCell className="w-24">
                  <div className="relative w-20 h-20">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>Rs. {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity} acre</TableCell>
                {/* <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.status === "available" ? "Available" : "Out of Stock"}
                  </span>
                </TableCell> */}
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Update Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4 mt-2">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  name="name"
                  value={selectedProduct.productName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  name="category"
                  value={selectedProduct.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  name="quantity"
                  type="number"
                  value={selectedProduct.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  name="imageUrl"
                  value={selectedProduct.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Update Product</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductsPage
