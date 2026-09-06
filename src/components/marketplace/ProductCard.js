import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

export default function ProductCard({ product, navigation }) {
  const handlePress = () => {
    if (navigation?.navigate) {
      navigation.navigate("ProductDetails", { productId: product.id });
    }
  };

  const formattedPrice = `₹${Number(product.price || 0).toLocaleString("en-IN")}`;
  const variantCount = product.variants?.length || 0;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText} numberOfLines={1}>
              {product.category}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formattedPrice}</Text>
          {variantCount > 0 ? (
            <Text style={styles.variantHint}>{variantCount} opts</Text>
          ) : null}
        </View>

        <View style={styles.emiBadge}>
          <Text style={styles.emiText}>✦ No-Cost EMI</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  imageWrap: {
    width: "100%",
    height: 125,
    backgroundColor: "#F0F0F3",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 18,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    flexShrink: 1,
    marginRight: spacing.xs,
  },
  variantHint: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
    flexShrink: 0,
  },
  emiBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.successLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginTop: spacing.sm,
  },
  emiText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
