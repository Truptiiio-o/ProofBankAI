export interface CustomerProfile {
  name: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
}

export interface CreditCardSummary {
  name: string;
  annualFee: number;
  rewardRate: number;
}

export interface PersonalLoanSummary {
  name: string;
  principal: number;
  tenureMonths: number;
  interestRate: number;
  monthlyEmi: number;
  remainingMonths: number;
}

export interface AccountSummary {
  currentBalance: number;
  averageMonthlyBalance: number;
  savingsInterestRate: number;
  creditCard: CreditCardSummary;
  personalLoan: PersonalLoanSummary;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "credit" | "debit";
}

export interface CustomerData {
  profile: CustomerProfile;
  accountSummary: AccountSummary;
  transactions: Transaction[];
}

export interface SavingsTier {
  balanceRange: string;
  interestRate: number;
}

export interface CreditCardProduct {
  name: string;
  annualFee: number;
  rewardRate: number;
  benefits: string;
}

export interface PersonalLoanProduct {
  name: string;
  interestRateMin: number;
  interestRateMax: number;
  processingFee: string;
  maxTenureMonths: number;
}

export interface FixedDepositRate {
  tenure: string;
  generalRate: number;
  seniorCitizenRate: number;
}

export interface BankAProducts {
  bankName: string;
  savingsAccount: {
    tiers: SavingsTier[];
  };
  creditCards: CreditCardProduct[];
  personalLoans: PersonalLoanProduct;
  fixedDeposits: FixedDepositRate[];
}
