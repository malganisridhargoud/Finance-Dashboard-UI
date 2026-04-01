
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getTotals = (transactions = []) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getFilteredTransactions = (
  transactions = [],
  { search = "", type = "All", category = "All", sort = "date_desc" } = {}
) => {
  const query = search.trim().toLowerCase();

  let result = [...transactions].filter((t) => {
    const matchesSearch =
      !query ||
      [t.description, t.category, t.type, t.date, String(t.amount)]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesType = type === "All" || t.type === type;
    const matchesCategory = category === "All" || t.category === category;

    return matchesSearch && matchesType && matchesCategory;
  });

  result.sort((a, b) => {
    switch (sort) {
      case "date_asc":
        return new Date(a.date) - new Date(b.date);
      case "date_desc":
        return new Date(b.date) - new Date(a.date);
      case "amount_asc":
        return Number(a.amount) - Number(b.amount);
      case "amount_desc":
        return Number(b.amount) - Number(a.amount);
      case "category_asc":
        return a.category.localeCompare(b.category);
      case "category_desc":
        return b.category.localeCompare(a.category);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return result;
};

export const getMonthlyTrend = (transactions = []) => {
  const map = new Map();

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });

    if (!map.has(key)) {
      map.set(key, { month: key, balance: 0, income: 0, expense: 0 });
    }

    const item = map.get(key);
    if (t.type === "income") {
      item.income += Number(t.amount || 0);
      item.balance += Number(t.amount || 0);
    } else {
      item.expense += Number(t.amount || 0);
      item.balance -= Number(t.amount || 0);
    }
  });

  return Array.from(map.values());
};

export const getCategoryBreakdown = (transactions = []) => {
  const map = new Map();

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map.set(t.category, (map.get(t.category) || 0) + Number(t.amount || 0));
    });

  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getInsights = (transactions = []) => {
  const totals = getTotals(transactions);
  const expenses = transactions.filter((t) => t.type === "expense");
  const breakdown = getCategoryBreakdown(transactions);
  const topCategory = breakdown[0] || { name: "N/A", value: 0 };

  const monthlyTrend = getMonthlyTrend(transactions);
  const lastMonth = monthlyTrend[monthlyTrend.length - 1];
  const prevMonth = monthlyTrend[monthlyTrend.length - 2];

  const monthlyDelta =
    lastMonth && prevMonth
      ? {
          income: lastMonth.income - prevMonth.income,
          expense: lastMonth.expense - prevMonth.expense,
          balance: lastMonth.balance - prevMonth.balance,
        }
      : null;

  const avgExpense = expenses.length
    ? expenses.reduce((s, t) => s + Number(t.amount || 0), 0) / expenses.length
    : 0;

  return {
    topCategory,
    monthlyDelta,
    avgExpense,
    balanceHealth:
      totals.balance > 0
        ? "positive"
        : totals.balance < 0
        ? "negative"
        : "neutral",
  };
};

export const groupByType = (transactions = []) => ({
  income: transactions.filter((t) => t.type === "income"),
  expense: transactions.filter((t) => t.type === "expense"),
});

export const getUniqueCategories = (transactions = []) => {
  const set = new Set(transactions.map((t) => t.category));
  return ["All", ...Array.from(set).sort()];
};

export const createEmptyTransaction = () => ({
  id: crypto?.randomUUID?.() || `tx_${Date.now()}`,
  date: new Date().toISOString().slice(0, 10),
  amount: 0,
  category: "Other",
  type: "expense",
  description: "",
});
