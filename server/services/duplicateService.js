/**
 * Calculates distance between two GPS coordinates using the Haversine formula
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} distance in meters
 */
export function calculateDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Checks for duplicate or nearby active complaints within a threshold (default 150m)
 */
export function findNearbyDuplicates(newLat, newLng, categoryId, existingComplaints, thresholdMeters = 150) {
  if (!newLat || !newLng) return { hasDuplicate: false, duplicates: [] };

  const duplicates = [];

  for (const complaint of existingComplaints) {
    // Only check unresolved complaints
    if (['Resolved', 'Citizen Verified', 'Closed'].includes(complaint.status)) continue;
    if (!complaint.location?.lat || !complaint.location?.lng) continue;

    const distance = calculateDistanceInMeters(newLat, newLng, complaint.location.lat, complaint.location.lng);

    if (distance <= thresholdMeters) {
      const isSameCategory = !categoryId || complaint.categoryId === categoryId;
      const confidence = isSameCategory 
        ? Math.round(100 - (distance / thresholdMeters) * 30) // up to 100% confidence
        : Math.round(70 - (distance / thresholdMeters) * 30);

      duplicates.push({
        complaintId: complaint.id,
        title: complaint.title,
        status: complaint.status,
        priority: complaint.priority,
        categoryName: complaint.categoryName,
        distanceMeters: distance,
        reportCount: complaint.reportCount || 1,
        imageUrl: complaint.imageUrl,
        confidence
      });
    }
  }

  duplicates.sort((a, b) => a.distanceMeters - b.distanceMeters);

  return {
    hasDuplicate: duplicates.length > 0,
    count: duplicates.length,
    thresholdMeters,
    duplicates
  };
}
