// URL API (Ganti dengan URL API yang sebenarnya)
const provinsiApiURL =
  "https://api.goapi.io/regional/provinsi?api_key=d5744477-a6d3-568a-45b0-e592a96a";
const kotaApiURL =
  "https://api.goapi.io/regional/kota?api_key=d5744477-a6d3-568a-45b0-e592a96a&provinsi_id=";

// Fungsi untuk mengambil data dari API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Data fetched from API:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

// Fungsi untuk menampilkan daftar provinsi
async function displayProvinsi() {
  try {
    const response = await fetchData(provinsiApiURL);
    const provinsiList = document.getElementById("provinsi-list");

    if (response && response.data && Array.isArray(response.data)) {
      response.data.forEach((provinsi) => {
        const listItem = document.createElement("li");
        listItem.textContent = provinsi.name;
        listItem.addEventListener("click", () =>
          displayKota(provinsi.id, provinsi.name)
        );
        provinsiList.appendChild(listItem);
      });
    } else {
      console.error("Data format is not as expected for provinsi");
    }
  } catch (error) {
    console.error("Error displaying provinsi:", error);
  }
}

// Fungsi untuk menampilkan daftar kota berdasarkan ID provinsi
async function displayKota(provinsiId, provinsiName) {
  try {
    const response = await fetchData(`${kotaApiURL}${provinsiId}`);
    const kotaList = document.getElementById("kota-list");
    const kotaHeading = document.getElementById("kota-heading");

    // Kosongkan daftar kota sebelumnya
    kotaList.innerHTML = "";

    // Menampilkan heading kota
    kotaHeading.style.display = "block";
    kotaHeading.textContent = `Kota di Provinsi ${provinsiName}`;

    if (response && response.data && Array.isArray(response.data)) {
      response.data.forEach((kota) => {
        const listItem = document.createElement("li");
        listItem.textContent = kota.name;
        kotaList.appendChild(listItem);
      });
    } else {
      console.error("Data format is not as expected for kota");
    }
  } catch (error) {
    console.error("Error displaying kota:", error);
  }
}

// Panggil fungsi displayProvinsi ketika halaman selesai dimuat
window.addEventListener("DOMContentLoaded", displayProvinsi);
