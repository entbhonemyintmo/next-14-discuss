import { db } from '@/db';
import { Path } from '@/utils';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

export default async function TopicList() {
  const topicData = await db.topic.findMany();

  const topicComponents = topicData.map((topic) => {
    return (
      <Chip
        key={topic.id}
        variant="flat"
        color="secondary"
        className="cursor-pointer"
      >
        <Link href={Path.topicShow(topic.slug)}>{topic.slug}</Link>
      </Chip>
    );
  });

  return <div className="flex flex-wrap gap-2">{topicComponents}</div>;
}
