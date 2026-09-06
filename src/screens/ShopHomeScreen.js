import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { screenPadding, spacing } from "../constants/spacing";

import HeroBanner from "../components/shop/HeroBanner";
import PillTabs from "../components/common/PillTabs";
import SearchBar from "../components/common/SearchBar";
import TopBrandsPlaceholder from "../components/shop/TopBrandsPlaceholder";
import NearbyStoresPlaceholder from "../components/shop/NearbyStoresPlaceholder";
import MarketplaceHome from "../components/marketplace/MarketplaceHome";

const TABS = ["Top Brands", "Nearby Stores", "Marketplace"];

const SEARCH_PLACEHOLDER = {
  "Top Brands": "Search online stores...",
  "Nearby Stores": "Search stores...",
  "Marketplace": "Search products...",
};

export default function ShopHomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Marketplace");
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <HeroBanner />
        <PillTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={SEARCH_PLACEHOLDER[activeTab]}
        />

        {activeTab === "Top Brands" && <TopBrandsPlaceholder />}
        {activeTab === "Nearby Stores" && <NearbyStoresPlaceholder />}
        {activeTab === "Marketplace" && (
          <MarketplaceHome query={query} navigation={navigation} />
        )}
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
    padding: screenPadding,
    paddingBottom: spacing.xxl,
  },
});
