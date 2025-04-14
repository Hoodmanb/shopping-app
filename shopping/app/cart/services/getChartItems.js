const getChartItems = async (id) => {
  const idToken = sessionStorage.getItem('clientIdToken') || null;

  try {
    const res = await fetch('/api/chart', {
      method: 'GET',
      headers: {
        Authorization: idToken,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.message === 'successful') {
      return data.chart;
    }
    return data.message;
  } catch (err) {
    return `Error: ${err.message}`;
  }
};

export default getChartItems;
