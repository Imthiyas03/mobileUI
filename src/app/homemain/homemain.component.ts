import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-homemain',
  templateUrl: './homemain.component.html',
  styleUrls: ['./homemain.component.css']
})
export class HomemainComponent implements OnInit, OnDestroy {
  images: string[] = [
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e3643f4ecf26b682.jpg?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/5593372761390886.jpg?q=50',
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/e1e2c9d3d811658b.jpg?q=50',
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/3be80c25d918cf4e.jpg?q=50',
    'https://rukminim2.flixcart.com/fk-p-flap/844/140/image/fd7195bd81f64666.jpg?q=50'
  ];
  
  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.nextImage(); // Automatically slide to the next image
    }, 5000); // Change image every 5 seconds
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlider();
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlider();
  }

  updateSlider(): void {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    const slideWidth = 100 / this.images.length; // Calculate the width of each slide
    sliderWrapper.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;
  }
}
