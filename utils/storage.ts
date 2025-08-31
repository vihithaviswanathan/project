import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Category } from '@/types/expense';

const EXPENSES_KEY = 'expenses';
const CATEGORIES_KEY = 'categories';

export const defaultCategories: Category[] = [
  { id: '1', name: 'Food', icon: '🍽️', color: '#10B981' },
  { id: '2', name: 'Transport', icon: '🚗', color: '#3B82F6' },
  { id: '3', name: 'Shopping', icon: '🛒', color: '#8B5CF6' },
  { id: '4', name: 'Bills', icon: '💡', color: '#EF4444' },
  { id: '5', name: 'Other', icon: '📝', color: '#6B7280' },
];

export const saveExpenses = async (expenses: Expense[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const loadExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

export const saveCategories = async (categories: Category[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

export const loadCategories = async (): Promise<Category[]> => {
  try {
    const data = await AsyncStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : defaultCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return defaultCategories;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([EXPENSES_KEY, CATEGORIES_KEY]);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};