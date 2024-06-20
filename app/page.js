// app/page.js

import Layout from './layout';
import Link from 'next/link';

export default function Page() {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
          <p className="mb-4">This is the landing page of Antonio Neto's website.</p>
          <Link href="/curriculum">
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Go to Curriculum
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
