import { FeedbackReason } from './feedback-reason';

export interface Feedback {
  body?: string;
  reason?: FeedbackReason;
}
