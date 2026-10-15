(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (v) => typeof v === "number" && isFinite(v);
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const wa = (t) => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(t);
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lista = (v) => (Array.isArray(v) ? v : []);

  const ICONES = {
    celular: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    tela: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M9 7l6 8M15 7l-6 8"/>',
    notebook: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 20h20"/>',
    sistema: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    upgrade: '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    programas: '<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 20h14"/>',
    impressao: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3"/><rect x="7" y="14" width="10" height="7"/>',
    digital: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
  };
  const icone = (n) => '<div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[n] || ICONES.digital) + "</svg></div>";

  function preco(normal, promo) {
    if (num(promo)) return '<div class="preco">' + (num(normal) ? "<s>" + brl(normal) + "</s>" : "") + brl(promo) + "</div>";
    if (num(normal)) return '<div class="preco">' + brl(normal) + "</div>";
    return '<div class="preco consulte">Consulte o valor</div>';
  }

  // Todo elemento com data-wa vira link do WhatsApp
  function ligarWa(raiz) {
    (raiz || document).querySelectorAll("[data-wa]").forEach((a) => {
      a.href = wa(a.dataset.wa);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  const btnWa = (txt, msg, classe) => '<a class="btn ' + (classe || "btn-azul btn-peq") + '" data-wa="' + esc(msg) + '">' + esc(txt) + "</a>";

  // Serviços
  function servicos() {
    $("#lista-servicos").innerHTML = lista(SERVICOS).map((s) =>
      '<article class="card">' + icone(s.icone) + "<h3>" + esc(s.titulo) + "</h3><p>" + esc(s.descricao) + "</p>" +
      btnWa("Consultar serviço", "Olá, Ativa Informática! Gostaria de informações sobre: " + s.titulo + ".") + "</article>"
    ).join("");
  }

  // Catálogo de reparos
  function opcoes(sel, primeiro, itens) {
    sel.innerHTML = '<option value="">' + primeiro + "</option>" + itens.map((i) => '<option value="' + esc(i) + '">' + esc(i) + "</option>").join("");
  }
  function catalogo() {
    const dados = lista(APARELHOS);
    const uniq = (a) => [...new Set(a.filter(Boolean))];
    opcoes($("#f-marca"), "Todas as marcas", uniq(lista(MARCAS).concat(dados.map((d) => d.marca))));
    opcoes($("#f-cat"), "Todos os serviços", uniq(lista(CATEGORIAS_REPARO).concat(dados.map((d) => d.categoria))));

    function desenhar() {
      const q = norm($("#busca").value.trim()), m = $("#f-marca").value, c = $("#f-cat").value;
      const r = dados.filter((d) =>
        (!m || d.marca === m) && (!c || d.categoria === c) && (!q || norm(d.marca + " " + d.modelo).includes(q)));
      const st = $("#status");
      if (!dados.length) {
        st.textContent = "Estamos atualizando nossa lista de preços. Peça seu orçamento pelo WhatsApp.";
      } else if (!r.length) {
        st.textContent = "Nenhum aparelho encontrado.";
      } else {
        st.textContent = r.length + (r.length === 1 ? " serviço encontrado" : " serviços encontrados");
      }
      $("#lista-aparelhos").innerHTML = r.map((d) => {
        const msg = "Olá, Ativa Informática! Gostaria de um orçamento para " + String(d.categoria || "serviço").toLowerCase() +
          " do " + (d.marca || "") + " " + (d.modelo || "") + ". Vi o valor no site e gostaria de mais informações.";
        return '<article class="card ' + (d.disponivel === false ? "fora" : "") + '"><p class="meta">' + esc(d.marca) + "</p><h3>" + esc(d.modelo) + "</h3>" +
          '<p class="meta">' + esc(d.categoria) + "</p>" + (d.descricao ? "<p>" + esc(d.descricao) + "</p>" : "") +
          (num(d.precoPromo) ? '<span class="tag">Promoção</span>' : "") + (d.disponivel === false ? '<span class="tag off">Indisponível</span>' : "") +
          preco(d.preco, d.precoPromo) + (d.obs ? '<p class="meta">' + esc(d.obs) + "</p>" : "") +
          btnWa("Solicitar orçamento", msg) + "</article>";
      }).join("");
      ligarWa($("#lista-aparelhos"));
    }
    ["#busca", "#f-marca", "#f-cat"].forEach((s) => $(s).addEventListener("input", desenhar));
    desenhar();
  }

  // Alexa e receptores
  function produtos() {
    const itens = lista(PRODUTOS);
    const grupos = ["Todos"].concat([...new Set(itens.map((p) => p.grupo).filter(Boolean))]);
    let atual = "Todos";
    const chips = $("#chips");
    function desenhar() {
      chips.innerHTML = grupos.map((g) => '<button type="button" class="chip" aria-pressed="' + (g === atual) + '" data-g="' + esc(g) + '">' + esc(g) + "</button>").join("");
      $("#lista-produtos").innerHTML = itens.filter((p) => atual === "Todos" || p.grupo === atual).map((p) => {
        const off = p.disponivel === false;
        const msg = off
          ? "Olá, Ativa Informática! Vi o " + p.nome + " no site, mas está indisponível. Quando chega mais?"
          : "Olá, Ativa Informática! Tenho interesse em " + p.nome + ". Vi o valor no site e gostaria de mais informações.";
        return '<article class="card ' + (off ? "fora" : "") + '"><p class="meta">' + esc(p.grupo) + "</p><h3>" + esc(p.nome) + "</h3>" +
          (off ? '<span class="tag off">Indisponível</span>' : "") + preco(p.preco, p.precoPromo) +
          (p.obs ? '<p class="meta">' + esc(p.obs) + "</p>" : "") + btnWa(off ? "Perguntar disponibilidade" : "Tenho interesse", msg) + "</article>";
      }).join("");
      ligarWa($("#lista-produtos"));
    }
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-g]");
      if (b) { atual = b.dataset.g; desenhar(); }
    });
    $("#aviso-produtos").textContent = typeof AVISO_PRODUTOS === "string" ? AVISO_PRODUTOS : "";
    if (!itens.length) $("#chips").hidden = true;
    desenhar();
  }

  // Promoções vigentes
  function promocoes() {
    const hoje = new Date().toLocaleDateString("sv");
    const vig = lista(PROMOCOES).filter((p) => (!p.inicio || p.inicio <= hoje) && (!p.fim || p.fim >= hoje));
    if (!vig.length) return; // seção e link ficam ocultos
    $("#promocoes").hidden = false;
    $("#lista-promos").innerHTML = vig.map((p) => {
      const msg = "Olá, Ativa Informática! Vi a promoção \"" + p.titulo + "\" no site e gostaria de aproveitar.";
      const fim = p.fim ? p.fim.split("-").reverse().join("/") : "";
      return '<article class="card"><span class="tag">Promoção</span><h3>' + esc(p.titulo) + "</h3>" +
        (p.descricao ? "<p>" + esc(p.descricao) + "</p>" : "") + (p.servico ? '<p class="meta">Serviço: ' + esc(p.servico) + "</p>" : "") +
        (lista(p.modelos).length ? '<p class="meta">Modelos: ' + lista(p.modelos).map(esc).join(", ") + "</p>" : "") +
        preco(p.precoNormal, p.precoPromo) + (fim ? '<p class="meta">Válida até ' + fim + "</p>" : "") + btnWa("Quero essa promoção", msg) + "</article>";
    }).join("");
    ligarWa($("#lista-promos"));
  }
  const semPromo = () => { const l = $("#nav-promo"); if ($("#promocoes").hidden) l.hidden = true; };

  // Contato e rodapé
  function contato() {
    const c = CONFIG;
    const maps = c.mapsUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.endereco + (c.cidade ? ", " + c.cidade : ""));
    const tel = "tel:+" + c.whatsapp;
    const ig = "https://instagram.com/" + c.instagram;
    $("#lista-contato").innerHTML = [
      ["Endereço", esc(c.endereco) + (c.cidade ? ", " + esc(c.cidade) : ""), '<a href="' + esc(maps) + '" target="_blank" rel="noopener">Abrir no Google Maps</a>'],
      ["Telefone", '<a href="' + tel + '">' + esc(c.telefone) + "</a>", ""],
      ["WhatsApp", esc(c.telefone), btnWa("Chamar no WhatsApp", "Olá, Ativa Informática! Gostaria de atendimento.", "btn-zap btn-peq")],
      ["Instagram", '<a href="' + ig + '" target="_blank" rel="noopener">@' + esc(c.instagram) + "</a>", ""],
      ["E-mail", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>", ""],
      ["Horário de funcionamento", c.horario ? esc(c.horario) : "Em breve.", ""]
    ].map((x) => '<article class="card"><h3>' + x[0] + "</h3><p>" + x[1] + "</p>" + x[2] + "</article>").join("");
    $("#rod-contato").innerHTML = esc(c.telefone) + " · " + '<a href="' + ig + '" target="_blank" rel="noopener">@' + esc(c.instagram) + "</a>";
    $("#ano").textContent = new Date().getFullYear();
  }

  // Menu móvel
  function menu() {
    const b = $("#burger"), m = $("#menu");
    const fechar = () => { m.classList.remove("aberto"); b.setAttribute("aria-expanded", "false"); };
    b.addEventListener("click", () => {
      const aberto = m.classList.toggle("aberto");
      b.setAttribute("aria-expanded", String(aberto));
    });
    m.addEventListener("click", (e) => { if (e.target.closest("a")) fechar(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });
  }

  servicos(); catalogo(); produtos(); promocoes(); semPromo(); contato(); menu();
  ligarWa();
})();
