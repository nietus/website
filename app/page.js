// app/page.js

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <Link href="/curriculum" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Go to Curriculum
        </Link>
      </div>
    </div>
  );
}
