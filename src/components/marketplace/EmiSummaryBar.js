import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import Button from "../common/Button";

export default function EmiSummaryBar({ selectedPlan, onProceed }) {
  const insets = useSafeAreaInsets();
  const isSelected = Boolean(selectedPlan);

  const monthlyFormatted = isSelected
    ? `₹${Number(selectedPlan.monthlyAmount || 0).toLocaleString("en-IN")}`
    : "—";

  const isAndroid = Platform.OS === "android";
  const bottomPadding = isAndroid
    ? Math.max(insets.bottom, 48)
    : Math.max(insets.bottom, spacing.md);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <View style={styles.infoCol}>
        {isSelected ? (
          <>
            <Text style={styles.label}>{selectedPlan.duration}-Month Plan</Text>
            <Text style={styles.amount}>
              {monthlyFormatted}
              <Text style={styles.perMonth}> / mo</Text>
            </Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            Select an EMI plan to continue
          </Text>
        )}
      </View>

      <View style={styles.buttonWrap}>
        <Button
          title="Proceed"
          onPress={onProceed}
          disabled={!isSelected}
          icon="arrow-forward"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 8,
  },
  infoCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 2,
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textMuted,
  },
  amount: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  perMonth: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  buttonWrap: {
    width: 140,
  },
});
