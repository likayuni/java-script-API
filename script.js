const apiKey = "d5744477-a6d3-568a-45b0-e592a96a";

async function fetchProvinsi() {
  try {
    const response = await fetch(
      `https://api.goapi.io/regional/provinsi?api_key=d5744477-a6d3-568a-45b0-e592a96a`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const provinsiList = document.getElementById("provinsi-list");
    data.provinsi.forEach((provinsi) => {
      const listItem = document.createElement("li");
      listItem.textContent = provinsi.nama;
      listItem.addEventListener("click", () => fetchKota(provinsi.id));
      provinsiList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching provinsi:", error);
  }
}

async function fetchKota(provinsiId) {
  try {
    const response = await fetch(
      `https://api.goapi.io/regional/kota?api_key=d5744477-a6d3-568a-45b0-e592a96a`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const kotaList = document.getElementById("kota-list");
    kotaList.innerHTML = "";
    data.kota.forEach((kota) => {
      const listItem = document.createElement("li");
      listItem.textContent = kota.nama;
    });
  } catch (error) {
    console.error("Error fetching kota:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchProvinsi);
