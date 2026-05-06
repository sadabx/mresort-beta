import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchAllBookings } from '../api';

export default function AdminDashboardScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    setLoading(true);
    fetchAllBookings().then(data => {
      // Assuming data is array of arrays or objects, Apps Script will return objects
      setBookings(data.reverse()); // Show newest first
      setLoading(false);
    });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.roomName}>{item.room}</Text>
        <Text style={styles.status}>CONFIRMED</Text>
      </View>
      <Text style={styles.detail}><Text style={styles.label}>Name: </Text>{item.fullName}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Dates: </Text>{item.checkin} to {item.checkout}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Phone: </Text>{item.phone}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Guests: </Text>{item.guests}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.total}>Total: ৳{item.totalAmount}</Text>
        <Text style={styles.advance}>Due (30% Adv): ৳{item.advance30}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && bookings.length === 0 ? (
        <ActivityIndicator size="large" color="#ef4444" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadBookings} tintColor="#ef4444" />}
          ListEmptyComponent={<Text style={{color: '#888', textAlign: 'center', marginTop: 50}}>No bookings found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  card: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222', borderRadius: 8, padding: 15, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 10 },
  roomName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  status: { color: '#10b981', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 4 },
  detail: { color: '#ddd', fontSize: 14, marginBottom: 5 },
  label: { color: '#888' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#222' },
  total: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  advance: { color: '#ef4444', fontWeight: 'bold', fontSize: 14 }
});
