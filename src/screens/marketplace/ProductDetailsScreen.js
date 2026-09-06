import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { getProductById, getEmiPlans } from "../../services/marketplaceApi";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";

import VariantSelector from "../../components/marketplace/VariantSelector";
import EmiPlanCard from "../../components/marketplace/EmiPlanCard";
import EmiSummaryBar from "../../components/marketplace/EmiSummaryBar";
import SkeletonLoader from "../../components/common/SkeletonLoader";

export default function ProductDetailsScreen({ route, navigation }) {
  const productId = route?.params?.productId;

  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState(null);

  const [rawEmiPlans, setRawEmiPlans] = useState([]);
  const [emiLoading, setEmiLoading] = useState(false);
  const [emiError, setEmiError] = useState(null);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState(null);

  // Fetch product data
  const loadProduct = useCallback(async () => {
    if (!productId) {
      setProductError("No product ID specified.");
      setProductLoading(false);
      return;
    }

    setProductLoading(true);
    setProductError(null);
    try {
      const data = await getProductById(productId);
      if (!data) {
        throw new Error("Product not found.");
      }
      setProduct(data);
      if (data.variants && data.variants.length > 0) {
        setSelectedVariantId(data.variants[0].id);
      }
    } catch (err) {
      setProductError(err?.message || "Failed to load product details.");
    } finally {
      setProductLoading(false);
    }
  }, [productId]);

  // Fetch EMI plans separately so screen still renders if EMI fails
  const loadEmiPlans = useCallback(async () => {
    if (!productId) return;

    setEmiLoading(true);
    setEmiError(null);
    try {
      const plans = await getEmiPlans(productId);
      setRawEmiPlans(plans);
    } catch (err) {
      setEmiError(err?.message || "Unable to load EMI plans.");
    } finally {
      setEmiLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (product) {
      loadEmiPlans();
    }
  }, [product, loadEmiPlans]);

  // Find active variant
  const activeVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find((v) => v.id === selectedVariantId) || null;
  }, [product, selectedVariantId]);

  // Calculate dynamic effective price reflecting selected variant
  const effectivePrice = useMemo(() => {
    const base = product?.price || 0;
    const delta = activeVariant?.priceDelta || 0;
    return base + delta;
  }, [product, activeVariant]);

  // Recalculate EMI plans dynamically based on effective price
  const computedEmiPlans = useMemo(() => {
    if (!rawEmiPlans || rawEmiPlans.length === 0) return [];

    return rawEmiPlans.map((plan) => {
      let totalAmount = effectivePrice;
      if (plan.interest > 0) {
        const interestAmount = (effectivePrice * (plan.interest / 100) * (plan.duration / 12));
        totalAmount = Math.round(effectivePrice + interestAmount);
      }
      const monthlyAmount = Math.round(totalAmount / plan.duration);

      return {
        ...plan,
        monthlyAmount,
        totalAmount,
      };
    });
  }, [rawEmiPlans, effectivePrice]);

  const selectedPlan = useMemo(() => {
    return computedEmiPlans.find((p) => p.id === selectedEmiPlanId) || null;
  }, [computedEmiPlans, selectedEmiPlanId]);

  const handleProceed = () => {
    if (!selectedPlan) return;

    navigation.navigate("ProceedConfirmation", {
      product,
      variant: activeVariant,
      plan: selectedPlan,
      effectivePrice,
    });
  };

  if (productLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Loading Product...</Text>
          <View style={{ width: 24 }} />
        </View>
        <LoadingState message="Fetching product details..." />
      </SafeAreaView>
    );
  }

  if (productError || !product) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Error</Text>
          <View style={{ width: 24 }} />
        </View>
        <ErrorState
          title="Product Unavailable"
          message={productError || "Could not retrieve product information."}
          onRetry={loadProduct}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {product.category ? (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          ) : null}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>
              ₹{effectivePrice.toLocaleString("en-IN")}
            </Text>
            {activeVariant?.priceDelta ? (
              <View style={styles.variantBadge}>
                <Text style={styles.variantBadgeText}>{activeVariant.label}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Variant Selector (if available) */}
        {product.variants && product.variants.length > 0 ? (
          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        ) : null}

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          <SectionHeader title="Product Details" />
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* EMI Section */}
        <View style={styles.emiSection}>
          <SectionHeader
            title="EMI Plans"
            right={
              computedEmiPlans.length > 0 ? (
                <Text style={styles.planCount}>
                  {computedEmiPlans.length} plans
                </Text>
              ) : null
            }
          />

          {emiLoading ? (
            <View style={{ gap: spacing.md, marginBottom: spacing.md }}>
              {[1, 2].map((item) => (
                <View key={item} style={styles.skeletonEmiCard}>
                  <View style={styles.skeletonEmiHeader}>
                    <SkeletonLoader width={100} height={16} />
                    <SkeletonLoader width={80} height={16} borderRadius={radius.pill} />
                  </View>
                  <SkeletonLoader width={140} height={20} style={{ marginBottom: spacing.xs }} />
                  <SkeletonLoader width="100%" height={12} style={{ marginTop: spacing.xs }} />
                </View>
              ))}
            </View>
          ) : emiError ? (
            <View style={styles.emiErrorCard}>
              <Text style={styles.emiErrorText}>{emiError}</Text>
              <Button
                title="Retry EMI Plans"
                onPress={loadEmiPlans}
                variant="secondary"
                icon="reload"
              />
            </View>
          ) : computedEmiPlans.length === 0 ? (
            <Text style={styles.noEmiText}>
              No EMI plans available for this product.
            </Text>
          ) : (
            computedEmiPlans.map((plan) => (
              <EmiPlanCard
                key={plan.id}
                plan={plan}
                selected={plan.id === selectedEmiPlanId}
                onSelect={setSelectedEmiPlanId}
              />
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

      {/* Sticky Bottom Summary & Proceed CTA */}
      <EmiSummaryBar
        selectedPlan={selectedPlan}
        onProceed={handleProceed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginHorizontal: spacing.sm,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 3,
  },
  skeletonEmiCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  skeletonEmiHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  imageContainer: {
    width: "100%",
    height: 230,
    backgroundColor: "#EBEBED",
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoSection: {
    marginBottom: spacing.md,
  },
  productName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
  },
  variantBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  variantBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  description: {
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  detailsSection: {
    marginVertical: spacing.md,
  },
  emiSection: {
    marginTop: spacing.sm,
  },
  planCount: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  emiLoadingWrap: {
    paddingVertical: spacing.xl,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  emiLoadingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  emiErrorCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  emiErrorText: {
    fontSize: 13,
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  noEmiText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    paddingVertical: spacing.xl,
  },
});
