
// api_ad671e09fd7a16e4e2793d9fe1c5141fbbca5a11aa9c38f5
// api_cec06f4e3ad635d68e451f0304b98f0cdde127fda0472d63

import axios from "axios";

async function estelam() {
    const response = await axios.post(
  "https://sandboxapi.bpey.ir/v1/card-to-iban",
  {
    request_id: "req_123456789",
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.BPEY_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

console.log(response.data);
}

estelam()