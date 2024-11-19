import { formatCurrency } from '@/libs/utils/utils'
import { Product } from '@/types/product.type'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function ProductItem(product: { item: Product }) {
  return (
    <Link
      href={{
        pathname: '/(app)/(tabs)/home/product-detail/[id]',
        params: { id: product.item._id }
      }}
      style={styles.productItem}
    >
      <View style={{ width: '100%' }}>
        <Image source={{ uri: product.item.image || 'https://via.placeholder.com/150' }} style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={2}>
          {product.item.name}
        </Text>
      </View>
      <View>
        <Text style={styles.productPriceDiscount}>đ{formatCurrency(product.item.price_before_discount)}</Text>
        <Text style={styles.productPrice}>đ{formatCurrency(product.item.price)}</Text>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
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
    marginBottom: 8,
    resizeMode: 'contain'
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
