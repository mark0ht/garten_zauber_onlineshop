import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Product A",
        price: 49.99,
        image: "/images/product-a.jpg",
        description: "A high-quality product",
      },
      {
        id: 2,
        name: "Product B",
        price: 34.99,
        image: "/images/product-b.jpg",
        description: "Another amazing product",
      },
      {
        id: 3,
        name: "Goldfruchtpalme",
        price: 29.99,
        image: "https://cdn.obi.de/product/images/6684419.jpg",
        description: "Höhe: 110-120 cm, Topf: ca. 24 cm, Areca Dypsis Lutescens",
        externalLink: "https://www.obi.de/p/6684419/goldfruchtpalme-hoehe-110-120-cm-topf-ca-24-cm-areca-dypsis-lutescens"
      }
    ]
  })
});
