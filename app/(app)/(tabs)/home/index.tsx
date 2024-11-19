import ProductItem from '@/components/ProductItem'
import productApi from '@/libs/apis/product.api'
import { Product } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DEFAULT_LIMIT = 20
const DEFAULT_PAGE = 1

export default function Home() {
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const { data, refetch } = useQuery({
    queryKey: ['products', page],
    queryFn: () => productApi.getProducts({ page: page, limit: DEFAULT_LIMIT })
  })

  const handleRefresh = useCallback(() => {
    setProducts([])
    setRefreshing(true)
    setPage(DEFAULT_PAGE)
    refetch().finally(() => setRefreshing(false))
  }, [refetch])

  const handleEndReached = useCallback(() => {
    setIsFetchingMore(true)
    setPage((prevPage) => prevPage + 1)
  }, [])

  const renderProductRow = useCallback(({ item }: { item: Product }) => <ProductItem item={item} key={item._id} />, [])

  useEffect(() => {
    if (data && data.data.data.products?.length > 0) {
      setProducts((prevProducts) => {
        const newProducts = data.data.data.products.filter(
          (product) => !prevProducts.find((prevProduct) => prevProduct._id === product._id)
        )
        return [...prevProducts, ...newProducts]
      })
      setIsFetchingMore(false)
    }
  }, [data])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProductRow}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isFetchingMore ? <ActivityIndicator size='small' color='#000' style={{ marginTop: 16 }} /> : null
          }
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
