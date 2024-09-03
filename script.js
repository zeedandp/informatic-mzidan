function getData() {
    const data = fetch('./data.json').then(res => res.json())
    return data
  }
  
  
  async function friendListsElement() {
    const friendLists = document.getElementById("friend_list");
    const data = await getData() 
    const lists = `
       ${data.map(i => `
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
    
    return friendLists.innerHTML = lists;
  }
  
  friendListsElement()