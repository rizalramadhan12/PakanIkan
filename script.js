let feedingTime = null;
let feedingInterval = null;
let feedingHistory = []; // Array untuk menyimpan riwayat waktu
const maxHistoryLength = 5; // Batas maksimum riwayat

document.getElementById('set-time').addEventListener('click', function() {
    const timeInput = document.getElementById('feeding-time').value;
    const statusMessage = document.getElementById('status-message');
    const feedingHistoryList = document.getElementById('feeding-history');

    if (timeInput) {
        feedingTime = timeInput;
        statusMessage.textContent = 'Waktu pemberian makan ikan diatur pada: ' + feedingTime;

        // Tambahkan waktu ke riwayat
        feedingHistory.push(feedingTime);
        
        // Batasi jumlah riwayat
        if (feedingHistory.length > maxHistoryLength) {
            feedingHistory.shift(); // Hapus entri paling lama
        }

        updateFeedingHistory(feedingHistoryList);

        // Hentikan interval sebelumnya jika ada
        if (feedingInterval) {
            clearInterval(feedingInterval);
        }

        // Set interval untuk memeriksa waktu setiap menit
        feedingInterval = setInterval(checkFeedingTime, 60000);
    } else {
        statusMessage.textContent = 'Silakan atur waktu terlebih dahulu.';
    }
});

// Fungsi untuk memeriksa waktu
function checkFeedingTime() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Ambil waktu dalam format HH:MM

    if (currentTime === feedingTime) {
        alert('Waktunya memberi makan ikan!');
        // Di sini Anda bisa menambahkan logika untuk mengontrol perangkat keras
    }
}

// Tambahkan event listener untuk tombol reset
document.getElementById('reset-time').addEventListener('click', function() {
    feedingTime = null; // Reset waktu
    if (feedingInterval) {
        clearInterval(feedingInterval); // Hentikan interval
        feedingInterval = null; // Reset interval
    }
    document.getElementById('feeding-time').value = ''; // Kosongkan input
    document.getElementById('status-message').textContent = 'Belum ada waktu yang diatur.'; // Reset pesan status
});

// Tambahkan event listener untuk tombol reset riwayat
document.getElementById('reset-history').addEventListener('click', function() {
    feedingHistory = []; // Kosongkan riwayat
    updateFeedingHistory(document.getElementById('feeding-history')); // Perbarui tampilan riwayat
});

// Fungsi untuk memperbarui riwayat waktu pemberian makan
function updateFeedingHistory(listElement) {
    // Kosongkan daftar sebelumnya
    listElement.innerHTML = '';
    // Tambahkan setiap waktu ke dalam daftar
    feedingHistory.forEach(function(time) {
        const listItem = document.createElement('li');
        listItem.textContent = time;
        listElement.appendChild(listItem);
    });
}