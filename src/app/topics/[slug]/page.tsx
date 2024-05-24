import PostCreateForm from '@/components/post/create-post-form';

interface TopicShowPageProps {
  params: { slug: string };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug: topic } = params;

  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">{topic}</h1>
      </div>

      <PostCreateForm topicName={topic} />
    </main>
  );
}
