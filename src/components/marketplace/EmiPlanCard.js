import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

export default function EmiPlanCard({ plan, selected, onSelect }) {
  const isNoCost = plan.interest === 0;
  const isAvailable = plan.available !== false;

  const handlePress = () => {
    if (isAvailable && onSelect) {
      onSelect(plan.id);
    }
  };

  const formattedMonthly = `₹${Number(plan.monthlyAmount || 0).toLocaleString("en-IN")}`;
  const formattedTotal = `₹${Number(plan.totalAmount || 0).toLocaleString("en-IN")}`;

  return (
    <Pressable
      onPress={handlePress}
      disabled={!isAvailable}
      style={[
        styles.card,
        selected && styles.cardSelected,
        !isAvailable && styles.cardDisabled,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.durationWrap}>
          <Text style={[styles.durationTitle, selected && styles.durationTitleSelected]}>
            {plan.duration} Months
          </Text>
          {isNoCost ? (
            <View style={styles.noCostBadge}>
              <Text style={styles.noCostText}>No-Cost EMI</Text>
            </View>
          ) : (
            <View style={styles.interestBadge}>
              <Text style={styles.interestText}>{plan.interest}% p.a.</Text>
            </View>
          )}
        </View>

        <View style={styles.radioWrap}>
          <Ionicons
            name={selected ? "radio-button-on" : "radio-button-off"}
            size={22}
            color={selected ? colors.primary : colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.monthlyAmount}>
          {formattedMonthly}
          <Text style={styles.perMonth}> / month</Text>
        </Text>
        <Text style={styles.totalAmount}>Total: {formattedTotal}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          Processing Fee: {plan.processingFee === 0 ? "FREE" : `₹${plan.processingFee}`}
        </Text>
        {!isAvailable ? (
          <View style={styles.unavailableBadge}>
            <Ionicons name="lock-closed" size={11} color={colors.textMuted} />
            <Text style={styles.unavailableText}>Unavailable</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardDisabled: {
    opacity: 0.5,
    backgroundColor: "#F8F8F9",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  durationWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  durationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  durationTitleSelected: {
    color: colors.primary,
  },
  noCostBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  noCostText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.success,
  },
  interestBadge: {
    backgroundColor: colors.pillBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  interestText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  radioWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  monthlyAmount: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  perMonth: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  totalAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xs + 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs + 2,
  },
  metaText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
  unavailableBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.border,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  unavailableText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
  },
});
