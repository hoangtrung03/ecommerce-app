import Loading from '@/components/Loading'
import ProductItem from '@/components/ProductItem'
import productApi from '@/libs/apis/product.api'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({ page: 1, limit: 20 })
  })

  const products = useMemo(() => data?.data?.data?.products?.flat() || [], [data])

  const renderProductRow = useCallback(({ item }: { item: Product }) => <ProductItem item={item} key={item._id} />, [])

  if (isLoading || error) return <Loading />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProductRow}
          keyExtractor={(item) => item._id}
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
  footerText: {
    fontSize: 14,
    color: '#666'
  },
  flatListContent: {
    padding: 16
  }
})
