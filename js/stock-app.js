var app = new Vue({
    el : "#app",
    data : {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        pengirimanList: [
            { kode: "REG", nama: "Reguler (3-5 hari)" },
            { kode: "EXP", nama: "Ekspres (1-2 hari)" }
        ],
        paket: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
        ],
        stok: [
            {
            kode: "EKMA4116",
            judul: "Pengantar Manajemen",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A3",
            harga: 65000,
            qty: 28,
            safety: 20,
            catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
            },
            {
            kode: "EKMA4115",
            judul: "Pengantar Akuntansi",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A4",
            harga: 60000,
            qty: 7,
            safety: 15,
            catatanHTML: "<strong>Cover baru</strong>"
            },
            {
            kode: "BIOL4201",
            judul: "Biologi Umum (Praktikum)",
            kategori: "Praktikum",
            upbjj: "Surabaya",
            lokasiRak: "R3-B2",
            harga: 80000,
            qty: 12,
            safety: 10,
            catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
            },
            {
            kode: "FISIP4001",
            judul: "Dasar-Dasar Sosiologi",
            kategori: "MK Pilihan",
            upbjj: "Makassar",
            lokasiRak: "R2-C1",
            harga: 55000,
            qty: 2,
            safety: 8,
            catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
            }
        ],
        stock_filter : [],
        upbjj_filter : '',
        qty_filter : false,
        sort_by : {
            column : '',
            order : 'desc',
            type : 'nan'
        }
    },
    computed : {
        viewStock(){
            let result = this.stok;
            if(this.stock_filter.includes('upbjj')){
                result = result.filter(data => data.upbjj === this.upbjj_filter);
            }
            if(this.qty_filter)
            {
                result = result.filter(data=> data.qty < data.safety)
            }
            const sort = this.sort_by;
            if(sort.column){
                if(sort.type === 'nan') result = result.toSorted((a, b) => a[sort.column].localeCompare(b[sort.column]));
                else if(sort.type === 'num') result = result.toSorted((a, b) => a[sort.column] - b[sort.column]);

                if(this.sort_by.order === 'desc') result = result.toReversed();
            }
            return result
        }
    },
    watch : {
        upbjj_filter(){
            if(this.upbjj_filter) this.stock_filter.push('upbjj')
            else this.stock_filter = this.stock_filter.filter(data=> data !== 'upbjj') 
        }
    },
    methods : {
        sortby(type, name){
            const prev_order = this.sort_by.order;
            this.sort_by = {
                column : name,
                order : prev_order === 'desc' ? 'asc' : 'desc',
                type : type
            }
        },
        resetFilter(){
            this.stock_filter = [];
            this.sort_by.column = '';
        }
    }
})