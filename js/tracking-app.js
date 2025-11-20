var app = new Vue({
    el : "#app",
    data : {
      pengirimanList: [
        { kode: "REG", nama: "Reguler (3-5 hari)" },
        { kode: "EXP", nama: "Ekspres (1-2 hari)" }
      ],
      paket: [
        { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
        { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
      ],
        // Simulasi status Delivery Order (opsional fitur Tracking DO)
      tracking: {
        "DO2025-0001": {
          nim: "123456789",
          nama: "Rina Wulandari",
          status: "Dalam Perjalanan",
          ekspedisi: "JNE",
          tanggalKirim: "2025-08-25",
          paket: "PAKET-UT-001",
          total: 120000,
          perjalanan: [
            { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
          ]
        },
        "DO2025-0002": {
            nim: "2023001234",
            nama: "Rina Wulandari",
            status: "Dalam Perjalanan",
            ekspedisi: "JNE",
            tanggalKirim: "2025-08-25",
            paket: "PAKET-UT-002",
            total: 140000,
            perjalanan:[
                { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"},
                { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: TANGERANG SELATAN"},      
                { waktu: "2025-08-25 10:12:20", keterangan: "Diteruskan ke Kantor Jakarta Selatan"},
            ]
        },
        "DO2025-0003": {
            nim: "2023001234",
            nama: "Agus Pranoto",
            status: "Dikirim",
            ekspedisi: "Pos Indonesia",
            tanggalKirim: "2025-08-25",
            paket: "PAKET-UT-001",
            total: 120000,
            perjalanan:[
                { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"},
                { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: TANGERANG SELATAN"},      
                { waktu: "2025-08-25 16:30:10", keterangan: "Diteruskan ke Kantor Kota Bandung"},
                { waktu: "2025-08-26 12:15:33", keterangan: "Tiba di Hub: Kota BANDUNG"},
                { waktu: "2025-08-26 15:06:12", keterangan: "Proses antar ke Cimahi"},
                { waktu: "2025-08-26 20:00:00", keterangan: "Selesai Antar. Penerima: Agus Pranoto"}
            ]
        }
      },
      nomor_do : '',
      current_order : {}
    },
    computed : {
        
    },
    methods : {
        searchDoNumber(){
            const result = this.tracking[this.nomor_do];
            if(!result){
                // TODO open modal
                console.error('order not found')
            }
            this.current_order = result;
        }
    }
})