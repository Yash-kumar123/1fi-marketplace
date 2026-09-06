import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import SectionHeader from "../common/SectionHeader";
import SkeletonLoader from "../common/SkeletonLoader";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import ProductCard from "./ProductCard";

import { getProducts } from "../../services/marketplaceApi";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

function ProductGridSkeleton() {
  return (
    <View style={styles.grid}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonCard}>
          <SkeletonLoader height={125} borderRadius={0} />
          <View style={styles.skeletonContent}>
            <SkeletonLoader width={60} height={12} style={{ marginBottom: spacing.xs }} />
            <SkeletonLoader width="90%" height={14} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="70%" height={14} style={{ marginBottom: spacing.sm }} />
            <SkeletonLoader width="50%" height={18} style={{ marginBottom: spacing.sm }} />
            <SkeletonLoader width={80} height={16} borderRadius={radius.pill} />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function MarketplaceHome({ query = "", navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err?.message || "Failed to load marketplace products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  // Case-insensitive filtering by product name or category
  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return products;
    }
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(trimmed) ||
        (item.category && item.category.toLowerCase().includes(trimmed))
    );
  }, [products, query]);

  const renderContent = () => {
    if (loading) {
      return <ProductGridSkeleton />;
    }

    if (error) {
      return (
        <ErrorState
          title="Couldn't Load Marketplace"
          message={error}
          onRetry={fetchProductsList}
        />
      );
    }

    if (products.length === 0) {
      return (
        <EmptyState
          icon="cube-outline"
          title="No Products Available"
          subtitle="Check back soon for new arrivals and exclusive offers."
        />
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <EmptyState
          icon="search-outline"
          title="No Products Found"
          subtitle={`We couldn't find anything matching "${query.trim()}".`}
        />
      );
    }

    return (
      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            navigation={navigation}
          />
        ))}
      </View>
    );
  };

  const countBadge = !loading && !error && products.length > 0 ? (
    <Text style={styles.countText}>
      {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
    </Text>
  ) : null;

  return (
    <View style={styles.container}>
      <SectionHeader title="Marketplace" right={countBadge} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xs,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  skeletonCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  skeletonContent: {
    padding: spacing.md,
  },
});
