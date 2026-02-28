import { Link } from 'react-router-dom';

const mockProducts = [
  { id: 1, name: "Leather Wallet", price: 29.99 },
  { id: 2, name: "Canvas Backpack", price: 49.99 },
  { id: 3, name: "Wooden Sunglasses", price: 19.99 },
  { id: 4, name: "Coffee Mug", price: 9.99 }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-primary">
      <header className="p-4 bg-primary text-white">
        <h1 className="text-xl font-bold">E-Shop</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl mb-4">Products</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map(p => (
            <div
              key={p.id}
              className="border rounded p-4 bg-white shadow"
            >
              <h3 className="font-semibold mb-2">{p.name}</h3>
              <p className="mb-2">${p.price.toFixed(2)}</p>
              <button className="bg-primary text-white px-3 py-1 rounded">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 text-center text-sm">
        © 2026 E-Shop
      </footer>
    </div>
  );
}
