
import React, { useState } from 'react';
import { useWordPressPosts } from '@/lib/wordpress-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';

const WordPressPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, isLoading, error, pagination } = useWordPressPosts(currentPage, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-9 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Unable to Load Blog Posts</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-sm text-slate-600 mb-4">
          Please make sure you've updated the WordPress API URL in src/lib/wordpress-api.ts
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center p-6 bg-slate-50 rounded-lg">
          <p className="text-lg text-slate-600">No posts found.</p>
          <p className="text-sm text-slate-500 mt-2">
            Please make sure your WordPress site has published posts and that the API URL is correct.
          </p>
        </div>
      ) : (
        <>
          {posts.map((post: any) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle 
                  className="text-xl" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="text-sm text-slate-500">
                  {new Date(post.date).toLocaleDateString()}
                  {post._embedded && post._embedded.author && (
                    <span> by {post._embedded.author[0].name}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="line-clamp-3 text-slate-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                
                {post.featured_media && post._embedded && post._embedded["wp:featuredmedia"] && (
                  <div className="mb-4">
                    <img 
                      src={post._embedded["wp:featuredmedia"][0].source_url} 
                      alt={post._embedded["wp:featuredmedia"][0].alt_text || "Featured image"} 
                      className="rounded-md w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  className="mt-2 flex items-center gap-2"
                  asChild
                >
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read More <ExternalLink size={16} />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="mx-4 flex items-center">
                  Page {currentPage} of {pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                >
                  Next
                </Button>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WordPressPostList;
