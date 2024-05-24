import Topics from '@/components/topic';

export default function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m2">Top Topics</h1>
      </div>
      <Topics />
    </main>
  );
}
