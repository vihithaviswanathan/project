export interface Expense {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
  timestamp: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ExpenseFilters {
  category?: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}