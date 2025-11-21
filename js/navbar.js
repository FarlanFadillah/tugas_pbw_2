const container = document.createElement('div')
container.classList = 'navbar';

container.innerHTML = `
    <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./stock.html">Informasi Bahan Ajar</a></li>
        <li><a href="./tracking.html">Tracking Pengiriman</a></li>
        <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Laporan</a>
            <div class="dropdown-content">
                <a href="#">Monitoring Progress DO Bahan Ajar</a>
                <a href="#">Rekap Bahan Ajar</a>
            </div>
        </li>
        <li><a href="">Histori Transaksi Bahan Ajar</a></li>
        <!--<li><a href="./login.html">Logout</a></li>-->
    </ul>
`

const main = document.querySelector("div");
main.insertAdjacentElement('beforebegin', container);
