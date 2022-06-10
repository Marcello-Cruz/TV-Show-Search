const sendQuery = async (evt) => {
  // Cancela ação padrão do botão
  evt.preventDefault();

  // Obtém elementos de tela
  const messageBox = document.getElementById("message");
  const showList = document.getElementById("shows");

  // Limpar lista e a mensagem
  messageBox.innerHTML = "";
  showList.innerHTML = "";

  // Obtendo o valor digitado
  const textToSearch = document.getElementById("query").value;

  // Montando a URL da API
  const url = `https://api.tvmaze.com/search/shows?q=${textToSearch}`;

  // Chamar a API
  const response = await fetch(url);

  // Testar se não teve sucesso
  if (!response.ok) {
      messageBox.innerHTML = "Failed to fetch results.";
      return;
  }

  // Ler o resultado
  const showsFetched = await response.json();

  // Saber se não veio nenhum show
  if (showsFetched.length === 0) {
      messageBox.innerHTML = "Not found.";
      return;
  }

  // Exibir os shows retornados
  showsFetched.forEach((item) => {
      const showName = item?.show?.name;
      const showPictureUrl = item?.show?.image?.medium || '';

      // Exibir o nome e a imagem
      showList.insertAdjacentHTML("beforeend", `
          <li>
              <img class="poster" src="${showPictureUrl}" />
              <span class="show-name">${showName}</span>
          </li>
      `);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document
      .getElementById("search-form")
      .addEventListener("submit", sendQuery);
});