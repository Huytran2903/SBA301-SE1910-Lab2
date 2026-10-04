// src/api/orchidService.axios.example.js - Axios version (for comparison)
import { apiClient } from './apiClient';

export async function getOrchidsByAxios() {
  // Note: Axios automatically parses JSON and returns response.data
  // Unlike Fetch which returns response and needs response.json()
  const response = await apiClient.get('/orchids.json');
  return response.data; // Axios wraps actual data in response.data
}
