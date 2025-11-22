var app = new Vue({
    el : "#app",
    data : {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
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
        view_stok : [],         // stok yang ditampilkan di table
        qty_filter : false,     // filter untuk stok yang menipis atau kosong
        sort_by : {},           // config sorting
        filter_key : '',        // nama kolom yang akan disorting
        filter_value : '',      // value yang akan disorting
        filters : [],           // daftar filter
        form : {},              // objek form buku
        form_message : {},      // config message
        show_message : false    // kondisi untuk kapan menampilkan message
    },
    computed : {
        viewStock(){
            if(this.view_stok.length <= 0) this.view_stok = this.stok;
            const sort = this.sort_by;

            for(value of this.filters){
                this.view_stok = this.view_stok.filter(data => data[value.key].toLowerCase() === value.val.toLowerCase())
            }

            if(this.qty_filter)
            {
                this.view_stok = this.view_stok.filter(data=> Number(data.qty) < Number(data.safety))
            }

            if(sort.column){
                if(sort.type === 'nan') this.view_stok = this.view_stok.toSorted((a, b) => a[sort.column].localeCompare(b[sort.column]));
                else if(sort.type === 'num') this.view_stok = this.view_stok.toSorted((a, b) => a[sort.column] - b[sort.column]);
                if(this.sort_by.order === 'desc') this.view_stok = this.view_stok.toReversed();
            }

            return this.view_stok;
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
        form : {
            handler(newVal){
                if(!this.kategoriList.map(item => item.toLowerCase()).includes(newVal.kategori.toLowerCase())){
                    this.form_message = {
                        type : 'warning',
                        text : 'Kategori tidak valid'
                    }
                    return this.show_message = true
                }if(!this.upbjjList.map(item => item.toLowerCase()).includes(newVal.upbjj.toLowerCase())){
                    this.form_message = {
                        type : 'warning',
                        text : 'UPBJJ tidak valid'
                    }
                    return this.show_message = true
                }else {
                    return this.show_message = false;
                }
            },
            deep : true
        },
        qty_filter(newVal){
            if(!newVal) this.view_stok = [];
        },
        stok : {
            handler(newVal){
                console.log('stok change')
            },
            deep : true
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
            this.filters = [];
            this.sort_by.column = '';
            this.view_stok = [];
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
            this.view_stok = [];
        },
        submitForm(e){
            e.preventDefault();
            const res = arrObjIncludes(this.stok, 'kode', this.form.kode);
            console.log('check if object contain spesific value', res);
            if(!res.found) this.stok.push(this.form);
            else {
                this.form_message = {
                        type : 'warning',
                        text : 'Buku dengan kode yang sama telah ada.'
                    }
                return this.show_message = true
            }

            this.form = {}
            this.view_stok = [];
            closeFormModal();
        },
        removeItem(kode){
            this.stok = this.stok.filter(data=> data.kode !== kode);
            this.view_stok = [];
        }
    }
})



function arrObjIncludes(arr, key, val){
    for(index in arr){
        console.log(arr[index][key].toLowerCase());
        console.log(val.toLowerCase());
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