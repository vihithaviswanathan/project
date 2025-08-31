import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Expense, Category } from '@/types/expense';

interface ExpenseCardProps {
  expense: Expense;
  category: Category | undefined;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, category, onDelete }: ExpenseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.categorySection}>
          <Text style={styles.categoryIcon}>{category?.icon || '📝'}</Text>
          <Text style={styles.categoryName}>{expense.category}</Text>
        </View>
        {expense.note && (
          <Text style={styles.note}>{expense.note}</Text>
        )}
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(expense.id)}
        >
          <Trash2 size={16} color="#EF4444" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  categorySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  note: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 4,
  },
});