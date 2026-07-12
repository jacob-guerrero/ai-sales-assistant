import { db } from '../config/firebase';
import { ThreadSession } from '../types';

export class ThreadRepository {
  private collection = db.collection('threads');

  async getActiveThreadByUserId(userId: string): Promise<ThreadSession | null> {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    
    return snapshot.docs[0].data() as ThreadSession;
  }

  async createThread(session: ThreadSession): Promise<void> {
    await this.collection.doc(session.threadId).set(session);
  }
}
