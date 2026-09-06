import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

export default function ProceedConfirmationScreen({ route, navigation }) {
  const { product, variant, plan, effectivePrice } = route.params || {};

  const handleDone = () => {
    navigation.navigate("ShopHome");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={64} color={colors.success} />
        </View>

        <Text style={styles.heading}>EMI Plan Confirmed!</Text>
        <Text style={styles.subheading}>
          Your order backed by 1Fi mutual funds is ready.
        </Text>

        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.productHeader}>
            {product?.image ? (
              <Image
                source={{ uri: product.image }}
                style={styles.productThumb}
                resizeMode="cover"
              />
            ) : null}
            <View style={styles.productMeta}>
              <Text style={styles.productName} numberOfLines={2}>
                {product?.name || "Product"}
              </Text>
              {variant ? (
                <Text style={styles.variantLabel}>Option: {variant.label}</Text>
              ) : null}
            </View>
          </View>

          {variant ? (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Option</Text>
              <Text style={styles.rowValue}>{variant.label}</Text>
            </View>
          ) : null}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Product Price</Text>
            <Text style={styles.rowValue}>
              ₹{Number(effectivePrice || product?.price || 0).toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Selected EMI Plan</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tenure</Text>
            <Text style={styles.rowValue}>{plan?.duration} Months</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Monthly Installment</Text>
            <Text style={[styles.rowValue, styles.primaryHighlight]}>
              ₹{Number(plan?.monthlyAmount || 0).toLocaleString("en-IN")} / mo
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Interest Rate</Text>
            <Text style={styles.rowValue}>
              {plan?.interest === 0 ? "0% (No-Cost EMI)" : `${plan?.interest}% p.a.`}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Processing Fee</Text>
            <Text style={styles.rowValue}>
              {plan?.processingFee === 0 ? "FREE" : `₹${plan?.processingFee}`}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>
              ₹{Number(plan?.totalAmount || effectivePrice || 0).toLocaleString("en-IN")}
            </Text>
          </View>
        </Card>

        <View style={styles.buttonWrap}>
          <Button
            title="Done"
            onPress={handleDone}
            variant="primary"
            icon="checkmark-outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
    paddingBottom: spacing.xxl + (Platform.OS === "android" ? 48 : 0),
  },
  iconWrap: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subheading: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  summaryCard: {
    width: "100%",
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  productThumb: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    marginRight: spacing.md,
  },
  productMeta: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  variantLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm + 2,
  },
  rowLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    maxWidth: "60%",
    textAlign: "right",
  },
  primaryHighlight: {
    color: colors.primary,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  buttonWrap: {
    width: "100%",
    marginTop: spacing.md,
  },
});
