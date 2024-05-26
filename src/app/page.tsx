import PostList from '@/components/post/post-list';
import Topics from '@/components/topic';
import { fetchTopPosts } from '@/db/queries/post';

export default function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-4 font-medium">Top Posts</h1>

        <PostList fetchData={fetchTopPosts} />
      </div>
      <Topics />
    </main>
  );
}
