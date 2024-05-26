import PostCreateForm from '@/components/post/create-post-form';
import PostList from '@/components/post/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/post';

interface TopicShowPageProps {
  params: { slug: string };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug: topic } = params;

  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-4 font-medium">{topic}</h1>

        <PostList fetchData={() => fetchPostsByTopicSlug(topic)} />
      </div>

      <PostCreateForm topicName={topic} />
    </main>
  );
}
