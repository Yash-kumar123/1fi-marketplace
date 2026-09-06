import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

export default function VariantSelector({ variants, selectedVariantId, onSelect }) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Option</Text>
      <View style={styles.chipRow}>
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId;
          const deltaText =
            v.priceDelta > 0
              ? ` (+₹${v.priceDelta.toLocaleString("en-IN")})`
              : v.priceDelta < 0
              ? ` (-₹${Math.abs(v.priceDelta).toLocaleString("en-IN")})`
              : "";

          return (
            <Pressable
              key={v.id}
              onPress={() => onSelect(v.id)}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {v.label}
                {deltaText ? (
                  <Text style={[styles.deltaText, isSelected && styles.deltaTextSelected]}>
                    {deltaText}
                  </Text>
                ) : null}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: 0.2,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: "700",
  },
  deltaText: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
  },
  deltaTextSelected: {
    color: colors.primaryDark,
  },
});
