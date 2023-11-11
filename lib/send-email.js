export function sendEmail(data, onSuccess, onError) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      onSuccess();
    })
    .catch((err) => {
      onError();
    });
}
