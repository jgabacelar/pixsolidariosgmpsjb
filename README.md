# Pix Solidário · Segue-me XXII edição

Site do termômetro de Pix para o encontro, pronto para hospedar no Netlify.
A contagem fica salva no servidor (Netlify Blobs), então todo mundo que abrir o link vê o mesmo número em tempo real.

## ⚠️ Importante: não dá para usar o "arrastar e soltar" direto no Netlify

Esse site tem uma função (`netlify/functions/pix-state.js`) que precisa de uma dependência (`@netlify/blobs`) para guardar a contagem. Se você arrastar a pasta/zip direto na área de deploy do Netlify, ele **não instala** essa dependência, e a função quebra (o que faz o PIN parecer sempre errado).

Use um dos dois caminhos abaixo — ambos são simples e não precisam de conhecimento técnico.

## Opção recomendada: GitHub + Netlify (sem usar terminal)

### 1. Suba os arquivos para o GitHub (pelo site, sem comandos)

1. Crie uma conta gratuita em [github.com](https://github.com).
2. Clique em **"New repository"**, dê um nome (ex: `pix-segueme`) e crie (pode deixar privado).
3. Na página do repositório, clique em **"uploading an existing file"** (ou **Add file → Upload files**).
4. Arraste todos os arquivos e pastas desta pasta para lá: `index.html`, `netlify.toml`, `package.json`, a pasta `img` e a pasta `netlify` (com a função dentro).
5. Clique em **Commit changes** para salvar.

### 2. Conecte no Netlify

1. Entre em [app.netlify.com](https://app.netlify.com) e crie uma conta gratuita.
2. Clique em **"Add new site" → "Import an existing project"** e escolha o repositório que você criou.
3. Pode deixar as configurações de build como estão (o Netlify lê o `netlify.toml` automaticamente, que já manda instalar tudo). Clique em **Deploy**.
4. Em alguns minutos o site estará no ar, em um endereço tipo `nome-aleatorio.netlify.app`. Você pode trocar esse nome em **Site settings → Change site name**.

Qualquer atualização futura: basta subir os arquivos novos no mesmo repositório do GitHub (mesmo passo do "Upload files") e o Netlify republica automaticamente.

## Opção alternativa: Netlify CLI (se você tiver Node.js instalado no computador)

```bash
npm install
npm install -g netlify-cli
netlify deploy --prod
```

Esse caminho funciona porque o `npm install` roda no seu computador (que tem internet), então a dependência é baixada antes do deploy.

## Definir o PIN de administrador (importante!)

Por padrão o PIN é `psjbsgm22`. Mesmo assim, recomendamos trocar por um PIN próprio antes de divulgar o link:

1. No painel do Netlify, vá em **Site settings → Environment variables**.
2. Clique em **Add a variable**, com a chave `ADMIN_PIN` e o valor que você quiser (ex: `2026segueme`).
3. Salve e depois vá em **Deploys → Trigger deploy → Deploy site** para aplicar.

## Atualizando a contagem no dia do evento

1. Abra o site publicado.
2. Clique no ícone de engrenagem no canto inferior.
3. Digite o PIN.
4. Use os botões **+1 Pix** / **−1 Pix**, ou defina a contagem exata e a meta.

Qualquer pessoa com o link vê a contagem atualizar automaticamente a cada 5 segundos — não precisa atualizar a página.

## Se der erro mesmo assim

Abra o painel administrativo e tente entrar com o PIN — agora a mensagem de erro mostra o motivo real (PIN incorreto vs. erro de servidor). Se for erro de servidor, no painel do Netlify vá em **Functions → pix-state → Function log** para ver o detalhe.
