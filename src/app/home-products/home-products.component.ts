import { Component, OnInit } from '@angular/core';
import { Product, ProductHome } from '../interfaces/adminlogindata';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../userprocess/user.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  uniqueBrands: string[] = [];
  selectedProduct: Product | null = null;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  constructor(private productService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.uniqueBrands = Array.from(new Set(data.map(product => product.brand)));
      this.updatePaginatedProducts();
    });
  }

  filterProducts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.brand.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  sortProducts(order: string): void {
    this.filteredProducts.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    this.updatePaginatedProducts();
  }

  filterByBrand(brand: string): void {
    this.filteredProducts = this.products.filter(product => product.brand === brand);
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  resetFilters(): void {
    this.filteredProducts = [...this.products];
    this.searchQuery = '';
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  onBuyNow(product: Product): void {
    if (this.userService.isLoggedIn()) {
      const userId = this.userService.getCurrentUser()?.id;
      const productId=product.productId;
      this.router.navigate(['order-page'], { queryParams: { productId, userId } });
      console.log('Buy Now clicked for', product);
    }
    else {
      this.router.navigate(['/userlogin']);
      console.log('Buy Now clicked for', product);
    }
  }

  onShowMore(product: Product): void {
    this.selectedProduct = product;
    console.log('Show More clicked for', product);
  }

  onCloseDetails(): void {
    this.selectedProduct = null;
  }

}
