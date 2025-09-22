import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FetchFunction<T> = (page: number, pageSize: number) => Promise<T[]>;

type PaginatedListProps<T> = {
  fetchData: FetchFunction<any>; // 👈 function to fetch items
  renderItem: ({ item }: { item: T }) => any;
  pageSize?: number;
  maxItems?: number;
  loadingText?: string;
  endText?: string;
  contentPadding?: number;
};

export default function PaginatedList<T>({
  fetchData,
  renderItem,
  pageSize = 10,
  maxItems = 100,
  loadingText = "Loading more…",
  endText = "🎉 You’ve reached the end",
  contentPadding = 80,
}: PaginatedListProps<T>) {
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMore(); // initial load
  }, []);

  const loadMore = async (customPage?: number, customePageSze?: number) => {
    if (loading) return;
    if (items.length >= maxItems) return;

    setLoading(true);
    try {
      const newData = await fetchData(
        customPage || page,
        customePageSze || pageSize
      );
      setItems((prev) => {
        if (customPage === 1) {
          // 👈 reset items on refresh
          return newData;
        }
        const merged = [...prev, ...newData];

        // optional safeguard: remove duplicates by ID
        const unique = merged.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        return unique;
      });
      setPage(customPage ? customPage + 1 : page + 1);
    } catch (error) {
      console.error("Pagination fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMore(1, 10); // reset to first page
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={() => loadMore()}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#FFD700", "#FFA500", "#FF8C00"]}
          onRefresh={onRefresh}
        />
      }
      ListFooterComponent={
        loading ? (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color="#2563EB" />
            <Text className="text-gray-500 text-sm mt-2">{loadingText}</Text>
          </View>
        ) : items.length >= maxItems ? (
          <Text className="text-center text-gray-400 py-4">{endText}</Text>
        ) : null
      }
      contentContainerStyle={{
        gap: 12,
        paddingBottom: insets.bottom + contentPadding,
      }}
    />
  );
}
