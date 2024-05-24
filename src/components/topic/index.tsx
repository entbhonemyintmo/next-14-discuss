import { Divider } from '@nextui-org/react';
import TopicCreateForm from './create-topic-form';
import TopicList from './topic-list';

export default function Topics() {
  return (
    <div className="flex flex-col gap-4 border rounded-lg p-4">
      <TopicCreateForm />
      <Divider />
      <TopicList />
    </div>
  );
}
