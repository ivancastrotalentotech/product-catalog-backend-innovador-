export interface Product {
    id: number;            // Corresponde al campo 'id' de tipo 'bigserial'
    nombre: string;        // Corresponde al campo 'nombre' de tipo 'text'
    descripcion: string;   // Corresponde al campo 'descripcion' de tipo 'text'
    precio: number;        // Corresponde al campo 'precio' de tipo 'numeric(22, 3)'
    categoria: string;     // Corresponde al campo 'categoria' de tipo 'text'
    imagen: string;        // Corresponde al campo 'imagen' de tipo 'text'
  }