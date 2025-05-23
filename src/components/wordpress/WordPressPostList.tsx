
import React, { useState } from 'react';
import { useWordPressPosts } from '@/lib/wordpress-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

const WordPressPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, isLoading, error, pagination } = useWordPressPosts(currentPage, 5);

  if (isLoading) {
    return <div className="p-4 text-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading posts: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center p-6 bg-slate-50 rounded-lg">
          No posts found.
        </div>
      ) : (
        <>
          {posts.map((post: any) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle 
                  className="text-xl" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="line-clamp-3 text-slate-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Button 
                  variant="outline" 
                  className="mt-2"
                  asChild
                >
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read More
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
