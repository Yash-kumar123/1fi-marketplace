import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

export default function PillTabs({ tabs, activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text
              style={[styles.label, active && styles.labelActive]}
              numberOfLines={1}
            >
              {tab}
            </Text>
            {active && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.pillBackground,
    borderRadius: radius.pill,
    padding: 4,
    marginBottom: spacing.lg,
  },
  pill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  pillActive: {
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
  },
  underline: {
    marginTop: 3,
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.primary,
  },
});
