import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";

export default function HeroBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/hero_banner.jpg")}
        style={styles.banner}
        imageStyle={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={styles.leftContent}>
          {/* Badge */}
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={10} color="#FFFFFF" style={styles.badgeIcon} />
            <Text style={styles.badgeText}>NO-COST EMIs</Text>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>
            Shop today,{"\n"}
            <Text style={styles.headlineItalic}>Pay later using</Text>
            {"\n"}Mutual funds.
          </Text>

          {/* Supporting Text */}
          <Text style={styles.supportingText}>
            No credit score required. No interest.{"\n"}
            Backed by your investments.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    borderRadius: radius.lg,
    overflow: "hidden",
    shadowColor: "#431AC4",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  banner: {
    width: "100%",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    backgroundColor: "#2B0EA0",
  },
  bannerImage: {
    borderRadius: radius.lg,
  },
  leftContent: {
    width: "53%",
    height: "100%",
    paddingLeft: spacing.lg,
    paddingRight: spacing.xs,
    paddingVertical: spacing.md + 2,
    justifyContent: "space-between",
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.45)",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9.5,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  headline: {
    color: colors.white,
    fontSize: 19.5,
    fontWeight: "800",
    lineHeight: 24.5,
    letterSpacing: -0.2,
    marginVertical: 2,
  },
  headlineItalic: {
    fontStyle: "italic",
    fontWeight: "600",
  },
  supportingText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 14.5,
    letterSpacing: 0.1,
  },
});
