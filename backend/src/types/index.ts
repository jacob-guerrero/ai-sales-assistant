export interface Lead {
  id?: string;
  name?: string;
  email?: string;
  score: number;
  createdAt: Date;
  source: string;
}

export interface ThreadSession {
  threadId: string;
  userId: string;
  status: 'active' | 'closed';
  createdAt: Date;
  lastActivity: Date;
}
