// Calculs financiers indicatifs : crédit, frais d'acquisition et coût mensuel réel d'un bien.
// Hypothèses volontairement simples et affichées à l'utilisateur ; elles ne remplacent pas une offre de prêt.

export const ASSUMPTIONS = {
  notaryRate: 0.075, // frais de notaire dans l'ancien (environ 7 à 8 %)
  guaranteeRate: 0.01, // caution ou hypothèque, environ 1 % du capital emprunté
  insuranceRate: 0.003, // assurance emprunteur, 0,30 % du capital par an
  debtRatio: 0.35, // taux d'endettement maximal, assurance comprise (règle HCSF)
  energyPricePerKwh: 0.11, // € par kWh d'énergie primaire indiquée au DPE (estimation moyenne)
}

export const DEFAULT_SETTINGS = { downPaymentRate: 0.2, years: 25, rate: 3.5, income: 7000, otherDebts: 0, downPayment: 150000 }

/** Mensualité hors assurance d'un prêt amortissable. */
export function monthlyPayment(principal, annualRatePct, years) {
  if (principal <= 0) return 0
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r) / (1 - (1 + r) ** -n)
}

/** Capital empruntable pour une mensualité donnée (hors assurance). */
export function principalFromPayment(payment, annualRatePct, years) {
  if (payment <= 0) return 0
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return payment * n
  return (payment * (1 - (1 + r) ** -n)) / r
}

export const notaryFees = (price) => Math.round(price * ASSUMPTIONS.notaryRate)

/** Estimation annuelle des dépenses d'énergie à partir de la consommation du DPE. */
export const yearlyEnergyCost = (property) =>
  Math.round((property.energy?.consumption ?? 0) * property.surface * ASSUMPTIONS.energyPricePerKwh)

/**
 * Coût réel d'un achat : budget total à financer et dépenses mensuelles.
 * @param property bien (transaction 'achat')
 * @param settings { downPayment, years, rate }
 */
export function purchaseCost(property, { downPayment, years, rate }) {
  const notary = notaryFees(property.price)
  const toFinanceBeforeGuarantee = Math.max(0, property.price + notary - downPayment)
  const guarantee = Math.round(toFinanceBeforeGuarantee * ASSUMPTIONS.guaranteeRate)
  const loan = toFinanceBeforeGuarantee + guarantee
  const credit = monthlyPayment(loan, rate, years)
  const insurance = (loan * ASSUMPTIONS.insuranceRate) / 12
  const tax = (property.propertyTax ?? 0) / 12
  const charges = property.charges ?? 0
  const energy = yearlyEnergyCost(property) / 12
  const monthly = credit + insurance + tax + charges + energy
  const totalCost = credit * years * 12 + insurance * years * 12 - loan
  return {
    notary,
    guarantee,
    loan,
    totalBudget: property.price + notary + guarantee,
    lines: [
      { key: 'credit', label: 'Mensualité du crédit', value: credit, color: '#0E2552' },
      { key: 'insurance', label: 'Assurance emprunteur', value: insurance, color: '#24467F' },
      { key: 'tax', label: 'Taxe foncière', value: tax, color: '#D85C45' },
      { key: 'charges', label: 'Charges de copropriété', value: charges, color: '#F3907D' },
      { key: 'energy', label: 'Énergie (estimée d’après le DPE)', value: energy, color: '#F8D6C7' },
    ].filter((l) => l.value > 0),
    monthly,
    creditCost: Math.max(0, totalCost),
    recommendedIncome: (credit + insurance) / ASSUMPTIONS.debtRatio,
  }
}

/** Budget d'achat maximal à partir des revenus et de l'apport (simulateur). */
export function maxBudget({ income, otherDebts, downPayment, years, rate }) {
  const maxPayment = Math.max(0, income * ASSUMPTIONS.debtRatio - otherDebts)
  // L'assurance est incluse dans les 35 % : on la retire de la mensualité disponible par approximation.
  const r = rate / 100 / 12
  const n = years * 12
  const annuityFactor = r === 0 ? n : (1 - (1 + r) ** -n) / r
  const loan = maxPayment / (1 / annuityFactor + ASSUMPTIONS.insuranceRate / 12)
  const credit = monthlyPayment(loan, rate, years)
  const insurance = (loan * ASSUMPTIONS.insuranceRate) / 12
  // Le budget finance le prix, les frais de notaire et la garantie.
  const guarantee = loan * ASSUMPTIONS.guaranteeRate
  const price = Math.max(0, (loan - guarantee + downPayment) / (1 + ASSUMPTIONS.notaryRate))
  return {
    maxPayment,
    loan: Math.round(loan),
    credit,
    insurance,
    price: Math.floor(price / 1000) * 1000,
    notary: Math.round(price * ASSUMPTIONS.notaryRate),
    guarantee: Math.round(guarantee),
    downPayment,
  }
}
