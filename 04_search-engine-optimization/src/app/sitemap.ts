import { getPosts } from '@/post.service';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000';
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequancy: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequancy: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequancy: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const blogPosts = await getPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.date,
    changeFrequancy: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
