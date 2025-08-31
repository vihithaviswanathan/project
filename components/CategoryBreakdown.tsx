import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense, Category } from '@/types/expense';
import { isThisMonth } from '@/utils/dateUtils';

interface CategoryBreakdownProps {
  expenses: Expense[];
  categories: Category[];
}

export default function CategoryBreakdown({ expenses, categories }: CategoryBreakdownProps) {
  const thisMonthExpenses = expenses.filter(expense => 
    isThisMonth(new Date(expense.date))
  );

  const categoryTotals = thisMonthExpenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {} as Record<string, number>);

  const totalAmount = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  if (totalAmount === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Breakdown</Text>
        <Text style={styles.emptyText}>No expenses this month</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Breakdown</Text>
      {Object.entries(categoryTotals).map(([categoryName, amount]) => {
        const category = categories.find(c => c.name === categoryName);
        const percentage = ((amount / totalAmount) * 100).toFixed(1);
        
        return (
          <View key={categoryName} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryIcon}>{category?.icon || '📝'}</Text>
              <Text style={styles.categoryName}>{categoryName}</Text>
            </View>
            <View style={styles.amountInfo}>
              <Text style={styles.amount}>${amount.toFixed(2)}</Text>
              <Text style={styles.percentage}>{percentage}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  amountInfo: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  percentage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});