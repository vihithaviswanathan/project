import { useState, useEffect } from 'react';
import { Expense, Category } from '@/types/expense';
import { saveExpenses, loadExpenses, saveCategories, loadCategories } from '@/utils/storage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [expensesData, categoriesData] = await Promise.all([
        loadExpenses(),
        loadCategories(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'timestamp'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    await saveExpenses(updatedExpenses);
  };

  const deleteExpense = async (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    await saveExpenses(updatedExpenses);
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);
  };

  const deleteCategory = async (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);
  };

  return {
    expenses,
    categories,
    loading,
    addExpense,
    deleteExpense,
    addCategory,
    deleteCategory,
    refreshData: loadData,
  };
};