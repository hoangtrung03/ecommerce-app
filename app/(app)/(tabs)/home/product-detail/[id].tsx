import CustomButton from '@/components/CustomButton'
import Loading from '@/components/Loading'
import productApi from '@/libs/apis/product.api'
import { AntDesign } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

export default function Page() {
  const { id } = useLocalSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ['product-item', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = useMemo(() => data?.data?.data, [data])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {product?.images && product.images.length > 0 ? (
          <View style={styles.imageContainer}>
            <Swiper showsPagination={false} autoplay autoplayTimeout={5}>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image ?? 'https://via.placeholder.com/150' }}
                  style={styles.productImage}
                />
              ))}
            </Swiper>
          </View>
        ) : null}

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product?.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product?.price}</Text>
            <Text style={styles.oldPrice}>${product?.price_before_discount}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <AntDesign name='star' size={24} color='#FFD700' />
            <Text style={styles.rating}>{product?.rating}</Text>
          </View>
          <Text style={styles.description}>{product?.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Quantity</Text>
              <Text style={styles.statValue}>{product?.quantity}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sold</Text>
              <Text style={styles.statValue}>{product?.sold}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Views</Text>
              <Text style={styles.statValue}>{product?.view}</Text>
            </View>
          </View>
          <CustomButton title='Add to Cart' styleText={styles.addToCartText} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  imageContainer: {
    height: 300
  },
  productImage: {
    width: '100%',
    height: '100%'
  },
  productInfo: {
    padding: 16
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  priceContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EF4444'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#fff'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  rating: {
    marginLeft: 8,
    fontSize: 18,
    color: '#FFD700'
  },
  description: {
    marginVertical: 12,
    fontSize: 16,
    color: '#666'
  },
  statsContainer: {
    marginTop: 16
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6
  },
  statLabel: {
    fontSize: 14,
    color: '#999'
  },
  statValue: {
    fontSize: 16,
    color: '#333'
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})
