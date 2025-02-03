import { defineStore } from 'pinia';
import product1Image from '@/assets/product1.jpg'; // Update with correct paths
import product2Image from '@/assets/product2.jpg';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      { id: 1, name: 'Übergangsjacke1', price: 89.99, image: product1Image },
      { id: 2, name: 'Übergangsjacke2', price: 54.99, image: product2Image },
      {
        id: 3,
        name: 'Goldfruchtpalme',
        price: 29.99,
        image: 'https://cdn.obi.de/product/images/6684419.jpg',
        description: 'Höhe: 110-120 cm, Topf: ca. 24 cm, Areca Dypsis Lutescens',
        externalLink: 'https://www.obi.de/p/6684419/goldfruchtpalme-hoehe-110-120-cm-topf-ca-24-cm-areca-dypsis-lutescens'
      }
    ]
  })
});
