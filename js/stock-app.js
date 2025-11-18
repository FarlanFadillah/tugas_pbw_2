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
        qty_filter : false,
        sort_by : {
            column : '',
            order : 'desc',
            type : 'nan'
        },
        filter_key : '',
        filter_value : '',
        filters : [
            {
                key : 'upbjj',
                val : 'jakarta'
            }
        ]
    },
    computed : {
        viewStock(){
            let result = this.stok;
            const sort = this.sort_by;

            for(value of this.filters){
                result = result.filter(data => data[value.key].toLowerCase() === value.val.toLowerCase())
            }

            if(this.qty_filter)
            {
                result = result.filter(data=> data.qty < data.safety)
            }

            if(sort.column){
                if(sort.type === 'nan') result = result.toSorted((a, b) => a[sort.column].localeCompare(b[sort.column]));
                else if(sort.type === 'num') result = result.toSorted((a, b) => a[sort.column] - b[sort.column]);
                if(this.sort_by.order === 'desc') result = result.toReversed();
            }

            return result
        },
        currentFilterList(){
            switch (this.filter_key) {
                case 'upbjj':
                    return this.upbjjList;
                case 'kategori':
                    return this.kategoriList;
                default:
                    return [];
            }
        }
    },
    watch : {
        
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
            this.filters = [];
            this.sort_by.column = '';
        },
        addFilter(){
            if(!this.filter_key || !this.filter_value) return;
            const obj = arrObjIncludes(this.filters, 'key', this.filter_key);
            if(!obj.found)
            {
                this.filters.push({
                    key : this.filter_key,
                    val : this.filter_value
                })
            }
            else {
                this.filters[obj.index].val = this.filter_value
            }

            this.filter_key = '';
            this.filter_value = '';
        },
        rmFilter(key){
            this.filters = this.filters.filter(data=> data.key !== key);
        }
    }
})



function arrObjIncludes(arr, key, val){
    for(index in arr){
        if(arr[index][key].toLowerCase() === val.toLowerCase()){
            return {
                index,
                found : true
            }
        }
    }
    return {
        index : null,
        found : false
    }
}