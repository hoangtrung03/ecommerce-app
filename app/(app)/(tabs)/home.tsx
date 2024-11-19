import Loading from '@/components/Loading'
import productApi from '@/libs/apis/product.api'
import { formatCurrency } from '@/libs/utils/utils'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useMemo } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({ page: 1, limit: 20 })
  })

  const products = useMemo(() => data?.data?.data?.products?.flat() || [], [data])

  const renderProductRow = useCallback(
    ({ item }: { item: Product }) => (
      <View style={styles.productItem}>
        <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPriceDiscount}>đ{formatCurrency(item.price_before_discount)}</Text>
        <Text style={styles.productPrice}>đ{formatCurrency(item.price)}</Text>
      </View>
    ),
    []
  )

  if (isLoading || error) return <Loading />

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content Section */}
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProductRow}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  mainContent: {
    marginBottom: 32
  },
  footerText: {
    fontSize: 14,
    color: '#666'
  },
  flatListContent: {
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  productItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },
  productPriceDiscount: {
    fontSize: 12,
    color: '#EF4444',
    textDecorationLine: 'line-through'
  },
  productPrice: {
    fontSize: 14,
    color: '#000000'
  }
})
