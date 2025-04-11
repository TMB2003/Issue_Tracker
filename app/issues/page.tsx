'use client';

import React from 'react';
import Link from 'next/link';

const IssuesPage = () => {
  return (
    <div className="p-6">
      <Link
        href="/issues/new"
        className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        New Issue
      </Link>
    </div>
  );
};

export default IssuesPage;
