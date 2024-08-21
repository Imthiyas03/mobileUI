import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginData, Product } from 'src/app/interfaces/adminlogindata';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/userprocess/user.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  editingProduct: Product | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';


  constructor(private productService: AuthService,private router:Router,private userservice:UserService) {}

  ngOnInit(): void {
    this.productService.getProducts(this.userservice.getCurrentUser()!.id).subscribe(products => {
      this.products = products;
      this.filteredProducts = products; // Initialize with all products
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.userservice.getCurrentUser()!.id).subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  search(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productId.toString().includes(query) || product.model.toLowerCase().includes(query)||product.brand.toLowerCase().includes(query)
    );
  }


  //!edit product//////////////////////////////////
  editProduct(product: Product): void {
    this.editingProduct = { ...product }; // Clone the product
    this.selectedImage = null;
    this.imagePreview = product.imageURL; // Set preview
  }

  handleImageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  updateProduct(): void {
    if (this.editingProduct) {
      const formData = new FormData();
      formData.append('brand', this.editingProduct.brand);
      formData.append('model', this.editingProduct.model);
      formData.append('price', this.editingProduct.price.toString());
      formData.append('ram', this.editingProduct.ram.toString());
      formData.append('rom', this.editingProduct.rom.toString());
      formData.append('processor', this.editingProduct.processor || '');
      formData.append('batteryCapacity', this.editingProduct.batteryCapacity.toString());
      if (this.editingProduct.sellerId && this.editingProduct.sellerId !== 0) {
        formData.append('sellerId', this.editingProduct.sellerId.toString());
      }
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }
      this.productService.updateProduct(this.editingProduct.productId, formData).subscribe(updatedProduct => {
        this.loadProducts();
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.selectedImage = null;
    this.imagePreview = '';
  }
  
  //! edit product ends here///////////////////////////////////////////////

  deleteProduct(productId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.products = this.products.filter(product => product.productId !== productId);
          this.filteredProducts = this.filteredProducts.filter(product => product.productId !== productId);
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}

