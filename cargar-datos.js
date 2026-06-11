import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./src/serviceAccountKey.json');
const productos = require('./src/productos.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function subirProductosMasivamente() {
  console.log("Iniciando carga masiva...");
  for (const prod of productos) {
    try {
      // Modificado: usamos .doc(String(prod.id)) para fijar el ID y .set(prod) para guardar los datos
      await db.collection('productos').doc(String(prod.id)).set(prod);
      console.log(`Producto con ID ${prod.id} subido correctamente.`);
    } catch (error) {
      console.error("Error al subir producto:", prod.name, error);
    }
  }
  console.log("¡Carga masiva finalizada!");
}

subirProductosMasivamente();