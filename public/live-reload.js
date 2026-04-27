/**
 * live-reload.js
 * Inclua este script no seu HTML apenas durante o desenvolvimento:
 * <script src="live-reload.js"></script>
 */

(function () {
  const INTERVAL_MS = 1000; // Intervalo de verificação (1 segundo)
  const FILE_TO_WATCH = location.href; // Observa a própria página

  let lastETag = null;
  let lastModified = null;

  async function checkForChanges() {
    try {
      const response = await fetch(FILE_TO_WATCH, {
        method: "HEAD",
        cache: "no-store",
      });

      const etag = response.headers.get("ETag");
      const modified = response.headers.get("Last-Modified");

      // Primeira execução: apenas armazena os valores atuais
      if (lastETag === null && lastModified === null) {
        lastETag = etag;
        lastModified = modified;
        return;
      }

      const etagChanged = etag && etag !== lastETag;
      const modifiedChanged = modified && modified !== lastModified;

      if (etagChanged || modifiedChanged) {
        console.log("[live-reload] Mudança detectada, recarregando...");
        location.reload();
      }
    } catch (err) {
      console.warn("[live-reload] Erro ao verificar mudanças:", err);
    }
  }

  setInterval(checkForChanges, INTERVAL_MS);
  console.log("[live-reload] Ativo — verificando a cada", INTERVAL_MS, "ms");
})();
