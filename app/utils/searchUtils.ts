// Utility functions for enhanced search functionality

/**
 * Normalizes text by removing accents and converting to lowercase
 * This makes search case-insensitive and accent-insensitive
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
    .trim()
}

/**
 * Enhanced search function that handles case and accent insensitivity
 */
export function searchInText(searchTerm: string, targetText: string): boolean {
  if (!searchTerm || !targetText) return false
  
  const normalizedSearch = normalizeText(searchTerm)
  const normalizedTarget = normalizeText(targetText)
  
  return normalizedTarget.includes(normalizedSearch)
}

/**
 * Extract city from address string
 * Assumes format: "123 Street, City, Province" or similar
 */
export function extractCityFromAddress(address: string): string {
  const addressParts = address.split(', ')
  return addressParts.length >= 2 ? addressParts[1] : ''
}