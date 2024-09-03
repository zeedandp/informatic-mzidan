const itemsPerPage = 20; // Jumlah item per halaman
let currentPage = 1; // Halaman saat ini
let allData = []; // Menyimpan semua data untuk pencarian

async function getData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    allData = data; // Simpan data untuk pencarian
    return data;
}

function renderData(data, page) {
    const friendList = document.getElementById('friend_list');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);

    const lists = `
        ${pageData.map(i => `
            <div class="card">
                <div class="data">
                    <img src="${i.fotoselfie}" alt="I${i.nama}" class="card-image" />
                    <div class="bos">
                        <span style="font-weight: bold;">${i.nama}</span>
                        <p>${parseInt(i.nim)}</p>
                    </div>
                </div>

                <div class="card-content">
    <table class="info-table">
        <tr>
            <td class="label">TTL</td>
            <td class="value"><span class="titikDua">:</span>${i.ttl}</td>
        </tr>
        <tr>
            <td class="label">Alamat</td>
            <td class="value"><span class="titikDua">:</span>${i.alamat}</td>
        </tr>
        <tr>
            <td class="label">No HP</td>
            <td class="value"><span class="titikDua">:</span>${i.no}</td>
        </tr>
    </table>
</div>

            </div>
        `).join("")}
    `;
    
    friendList.innerHTML = lists;
}

function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination-container');
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const paginationLinks = Array.from({ length: pageCount }, (_, i) => {
        const pageNumber = i + 1;
        return `
            <a href="#" class="${currentPage === pageNumber ? 'active' : ''}" data-page="${pageNumber}">
                ${pageNumber}
            </a>
        `;
    }).join("");

    paginationContainer.innerHTML = paginationLinks;
}

async function updatePage(page) {
    const data = await getData();
    const filteredData = filterData(data, document.getElementById('search-input').value);
    renderData(filteredData, page);
    renderPagination(filteredData.length);
}

function filterData(data, searchTerm) {
    return data.filter(item => item.nama.toLowerCase().includes(searchTerm.toLowerCase()));
}

function setupPagination() {
    document.getElementById('pagination-container').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            currentPage = parseInt(event.target.getAttribute('data-page'));
            updatePage(currentPage);
        }
    });
}

function setupSearch() {
    document.getElementById('search-input').addEventListener('input', () => {
        updatePage(currentPage);
    });
}

async function init() {
    await updatePage(currentPage);
    setupPagination();
    setupSearch();
}

init();