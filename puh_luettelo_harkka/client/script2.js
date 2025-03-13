document.addEventListener("DOMContentLoaded", () => {
  const lomake = document.getElementById("puhelintieto_lomake");
  const taulukko = document.querySelector(".table");
  let muokattavaId = null;

  function haeJaNäytäTiedot() {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => {
        taulukko.innerHTML = `
          <tr>
            <th>Id</th>
            <th>Nimi</th>
            <th>Puhelin</th>
            <th>Poista</th>
            <th>Muokkaa</th>
          </tr>
        `;

        data.forEach((item) => {
          const rivi = document.createElement("tr");
          rivi.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nimi}</td>
            <td>
              <span class="puhelin-text" data-id="${item.id}">${item.puhelin}</span>
              <input type="text" class="puhelin-input form-control d-none" name="puhelin" data-id="${item.id}" value="${item.puhelin}">
            </td>
            <td><button class="poista btn btn-danger btn-sm" data-id="${item.id}">x</button></td>
            <td><button class="muokkaa btn btn-primary btn-sm" data-id="${item.id}">Muokkaa</button></td>
          `;
          taulukko.appendChild(rivi);
        });

        lisääEventit();
      });
  }

  function lisääEventit() {
    document.querySelectorAll(".poista").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");

        fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" }).then(
          () => haeJaNäytäTiedot()
        );
      });
    });
  }

  lomake.addEventListener("submit", (event) => {
    event.preventDefault();

    const nimi = document.getElementById("nimi").value;
    const puhelin = document.getElementById("puhelin").value;

    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nimi, puhelin }),
    }).then(() => {
      lomake.reset();
      haeJaNäytäTiedot();
    });
  });

  function tallennaMuokkaus(id, uusiPuhelin) {
    const rivi = document
      .querySelector(`button.tallenna[data-id="${id}"]`)
      ?.closest("tr");
    const nimi = rivi ? rivi.children[1].textContent : null;

    fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), nimi, puhelin: uusiPuhelin }),
    }).then(() => {
      muokattavaId = null;
      haeJaNäytäTiedot();
    });
  }

  taulukko.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id");

    if (event.target.classList.contains("muokkaa")) {
      muokattavaId = id;

      const puhelinText = document.querySelector(
        `.puhelin-text[data-id="${id}"]`
      );
      const puhelinInput = document.querySelector(
        `.puhelin-input[data-id="${id}"]`
      );
      const muokkaaButton = event.target;

      puhelinText.classList.add("d-none");
      puhelinInput.classList.remove("d-none");
      puhelinInput.focus();

      muokkaaButton.textContent = "Tallenna";
      muokkaaButton.classList.remove("muokkaa");
      muokkaaButton.classList.add("tallenna");

      muokkaaButton.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          tallennaMuokkaus(id, puhelinInput.value);
        },
        { once: true }
      );
    }
  });

  haeJaNäytäTiedot();
});
