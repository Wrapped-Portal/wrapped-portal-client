// analytics.js

//Client ID
const CLIENT_ID = 'd526e49d-cc0f-468f-b04d-f59e21f6365a';
//Site sending the data
const SITE_NAME = 'Tune Port';

//How often send data per IP
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
const checkLastSent = () => {
  const lastSent = localStorage.getItem('lastSent');
  if (!lastSent) {
    return true;
  }

  const currentTime = new Date().getTime();
  const lastSentTime = new Date(lastSent).getTime();
  return currentTime - lastSentTime > ONE_HOUR;
};

const updateLastSent = () => {
  localStorage.setItem('lastSent', new Date().toISOString());
};

const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  ) {
    return 'mobile';
  } else if (/iPad/i.test(userAgent)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const getIpAddress = async () =>
  await fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .then((data) => data.ip);

window.analytics = async function analytics(siteName, clientId) {
  try {
    if (!checkLastSent()) {
      return;
    }

    const ipAddress = await getIpAddress();

    const data = {
      siteName,
      date: new Date().toISOString(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      deviceType: getDeviceType(),
      ipAddress,
    };

    const response = await fetch(
      'https://astro-server-z1u9.onrender.com/traffic-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': clientId, // Use X-Client-ID header to pass the client ID
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error sending data to the server: ${response.statusText}`,
      );
    }

    updateLastSent();
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  // Pass the CLIENT_ID as the second argument to the analytics function
  await analytics(SITE_NAME, CLIENT_ID);
})();
