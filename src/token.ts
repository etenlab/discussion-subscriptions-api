export class Token {
  static PgNotifyClient = Symbol('PgNotifyClient');

  static DiscussionCreated = 'discussionCreated';
  static PostCreated = 'postCreated';
  static PostDeleted = 'postDeleted';
  static ReactionCreated = 'reactionCreated';
  static ReactionDeleted = 'reactionDeleted';
}
