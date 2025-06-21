import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  rowSpan: number;
  colSpan: number;
}

interface GridSlot {
  type: 'single' | 'triple';
  images: GalleryImage[];
  rowSpan: number;
  colSpan: number;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  galleryImages: GalleryImage[] = [];
  gridSlots: GridSlot[] = [];
  selectedImageIndex: number = -1;
  isModalOpen: boolean = false;
  hoveredImageIndex: number = -1;

  ngOnInit() {
    this.initializeGallery();
  }

  private initializeGallery() {
    const imageFiles = [
      'DSC_0001.JPG', 'DSC_0003.JPG', 'DSC_0004.JPG', 'DSC_0008.JPG', 'DSC_0010.JPG',
      'DSC_0011.JPG', 'DSC_0013.JPG', 'DSC_0014.JPG', 'DSC_0023.JPG', 'DSC_0024.JPG',
      'DSC_0028.JPG', 'DSC_0031.JPG', 'DSC_0034.JPG', 'DSC_0035.JPG', 'DSC_0039.JPG',
      'DSC_0044.JPG', 'DSC_0053.JPG', 'DSC_0054.JPG', 'DSC_0055.JPG', 'DSC_0056.JPG',
      'DSC_0061.JPG', 'DSC_0065.JPG', 'DSC_0067.JPG', 'DSC_0069.JPG', 'DSC_0071.JPG',
      'DSC_0073.JPG', 'DSC_0076.JPG', 'DSC_0081.JPG', 'DSC_0083.JPG', 'DSC_0084.JPG',
      'DSC_0091.JPG', 'DSC_0096.JPG', 'DSC_0109.JPG', 'DSC_0110.JPG', 'DSC_0111.JPG',
      'DSC_0112.JPG', 'DSC_0114.JPG', 'DSC_0118.JPG', 'DSC_0125.JPG', 'DSC_0128.JPG',
      'DSC_0131.JPG', 'DSC_0134.JPG', 'DSC_0136.JPG', 'DSC_0139.JPG', 'DSC_0141.JPG',
      'DSC_0143.JPG', 'DSC_0144.JPG', 'DSC_0147.JPG', 'DSC_0152.JPG', 'DSC_0154.JPG',
      'DSC_0159.JPG', 'DSC_0161.JPG', 'DSC_0163.JPG', 'DSC_0167.JPG', 'DSC_0177.JPG',
      'DSC_0178.JPG', 'DSC_0185.JPG', 'DSC_0190.JPG', 'DSC_0192.JPG'
    ];

    // Create individual image objects
    this.galleryImages = imageFiles.map((filename, index) => ({
      src: `assets/images/gallery/${filename}`,
      alt: `Gallery image ${index + 1}`,
      width: 1,
      height: 1,
      rowSpan: 1,
      colSpan: 1
    }));

    this.createGridSlots();
  }

  private createGridSlots() {
    this.gridSlots = [];
    let imageIndex = 0;

    // Create rows with 3 slots each
    const rows = Math.ceil(this.galleryImages.length / 3);
    
    for (let row = 0; row < rows; row++) {
      const rowSlots: GridSlot[] = [];
      
      // Determine slot types for this row (randomize between single and triple)
      const slotTypes: ('single' | 'triple')[] = [];
      for (let i = 0; i < 3; i++) {
        // 60% chance for single, 40% chance for triple
        slotTypes.push(Math.random() < 0.6 ? 'single' : 'triple');
      }

      // Create slots for this row
      for (let slot = 0; slot < 3; slot++) {
        if (imageIndex >= this.galleryImages.length) break;

        const slotType = slotTypes[slot];
        const slotImages: GalleryImage[] = [];

        if (slotType === 'single') {
          // Single large image
          const image = this.galleryImages[imageIndex];
          image.rowSpan = 2;
          image.colSpan = 1;
          slotImages.push(image);
          imageIndex++;
        } else {
          // Triple: 2 small + 1 long image
          if (imageIndex + 2 < this.galleryImages.length) {
            // First small image
            const image1 = this.galleryImages[imageIndex];
            image1.rowSpan = 1;
            image1.colSpan = 1;
            slotImages.push(image1);
            imageIndex++;

            // Second small image
            const image2 = this.galleryImages[imageIndex];
            image2.rowSpan = 1;
            image2.colSpan = 1;
            slotImages.push(image2);
            imageIndex++;

            // Long image (spans both rows)
            const image3 = this.galleryImages[imageIndex];
            image3.rowSpan = 2;
            image3.colSpan = 1;
            slotImages.push(image3);
            imageIndex++;
          } else {
            // Fallback to single if not enough images
            const image = this.galleryImages[imageIndex];
            image.rowSpan = 2;
            image.colSpan = 1;
            slotImages.push(image);
            imageIndex++;
          }
        }

        rowSlots.push({
          type: slotType,
          images: slotImages,
          rowSpan: slotType === 'single' ? 2 : 2,
          colSpan: 1
        });
      }

      this.gridSlots.push(...rowSlots);
    }
  }

  onImageHover(index: number) {
    this.hoveredImageIndex = index;
  }

  onImageLeave() {
    this.hoveredImageIndex = -1;
  }

  onImageClick(index: number) {
    this.selectedImageIndex = index;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImageIndex = -1;
    document.body.style.overflow = 'auto';
  }

  navigateImage(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      this.selectedImageIndex = this.selectedImageIndex > 0 
        ? this.selectedImageIndex - 1 
        : this.galleryImages.length - 1;
    } else {
      this.selectedImageIndex = this.selectedImageIndex < this.galleryImages.length - 1 
        ? this.selectedImageIndex + 1 
        : 0;
    }
  }

  onModalClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.isModalOpen) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.navigateImage('prev');
        break;
      case 'ArrowRight':
        this.navigateImage('next');
        break;
    }
  }

  getImageIndex(image: GalleryImage): number {
    return this.galleryImages.findIndex(img => img.src === image.src);
  }
}
