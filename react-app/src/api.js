export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5wG-WQXyhkHPJgFWot3wuM2vi1fkg2XGaPXC8NPMsR3hhO3crs5ZRLp5xvdw2QbBTGg/exec';

export const fetchBookedDates = async (room) => {
  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getBookedDates&room=${encodeURIComponent(room)}`);
    const data = await response.json();
    return data.dates || [];
  } catch (error) {
    console.error("Error fetching dates:", error);
    return [];
  }
};

export const submitBooking = async (payload) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting booking:", error);
    return { success: false, error: error.message };
  }
};

export const fetchAllBookings = async () => {
  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getAllBookings`);
    const data = await response.json();
    return data.bookings || [];
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
};
