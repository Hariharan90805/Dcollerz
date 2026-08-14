// Firebase SDK has been removed for Cloudflare deployment

export interface DbLead {
  id?: string;
  clientName: string;
  phone: string;
  email?: string;
  businessName?: string;
  category?: string;
  packageInterest?: string;
  monthlyBudget?: string;
  notes?: string;
  status?: string;
  createdAt?: any;
}

export async function saveLeadToDb(lead: Omit<DbLead, 'id' | 'createdAt'>) {
  console.log('Mock: saveLeadToDb', lead);
  return { success: true, id: 'mock-id-' + Date.now() };
}

export interface DbTransaction {
  id?: string;
  orderId: string;
  tierId: string;
  tierName: string;
  billingCycle: string;
  amount: number;
  customerName: string;
  email: string;
  phone: string;
  customerPhone?: string;
  businessName?: string;
  paymentMethod: string;
  paymentStatus: string;
  upiId?: string;
  invoiceNumber?: string;
  timestamp?: any;
}

export async function saveTransactionToDb(txn: Omit<DbTransaction, 'id' | 'timestamp'>) {
  console.log('Mock: saveTransactionToDb', txn);
  return { success: true, id: 'mock-id-' + Date.now() };
}

export interface DbVisitor {
  id?: string;
  city: string;
  device: string;
  referrer: string;
  page: string;
  timestamp?: any;
}

export async function logVisitorToDb(visitor: Omit<DbVisitor, 'id' | 'timestamp'>) {
  console.log('Mock: logVisitorToDb', visitor);
  return { success: true, id: 'mock-id-' + Date.now() };
}

export interface DbReview {
  id?: string;
  name: string;
  role: string;
  company: string;
  category: string;
  location: string;
  rating: number;
  comment: string;
  result?: string;
  verified?: boolean;
  avatar?: string;
  createdAt?: any;
}

export async function saveReviewToDb(review: Omit<DbReview, 'id' | 'createdAt'>) {
  console.log('Mock: saveReviewToDb', review);
  return { success: true, id: 'mock-id-' + Date.now() };
}

export async function fetchReviewsFromDb(): Promise<DbReview[]> {
  console.log('Mock: fetchReviewsFromDb');
  return [];
}

export interface DbNotification {
  id?: string;
  type: string;
  title: string;
  details: string;
  recipientEmail: string;
  timestamp?: any;
  payload?: any;
}

export async function logNotificationToDb(notification: Omit<DbNotification, 'id' | 'timestamp'>) {
  console.log('Mock: logNotificationToDb', notification);
  return { success: true, id: 'mock-id-' + Date.now() };
}

export type Unsubscribe = () => void;

export function subscribeToNotifications(
  callback: (notifications: DbNotification[]) => void
): Unsubscribe {
  console.log('Mock: subscribeToNotifications');
  // Return dummy empty list
  callback([]);
  return () => {
    console.log('Mock: unsubscribe');
  };
}
