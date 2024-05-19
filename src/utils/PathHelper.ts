export class Path {
  public static home() {
    return '/';
  }

  public static topicShow(topicId: string) {
    return `/topics/${topicId}`;
  }

  public static postCreate(topicId: string) {
    return `/topics/${topicId}/posts/new`;
  }

  public static postShow(topicId: string, postId: string) {
    return `/topics/${topicId}/posts/${postId}`;
  }
}
