## Dockerについて

#### 立ち上げ
```
docker compose up front
```

#### コンテナの入り方、コンテナ外から実行する場合

```
docker compose run front bash
```
```
docker compose run front ~~~
```

## パッケージの追加について

yarnを使っているのでyarnでいれるようにしてください

`docker compose build`か、コンテナ内で`yarn install`のどちらかが必要になるので適宜連絡お願いします。

## ESLint、Prettier

ESLintを利用しています。
PRを上げる前にかならずESLintチェックしてください。

```bash
# ESLint
$ yarn lint
# ESLint + 自動修正
$ yarn lint:fix
# Prettierでフォーマット修正
$ yarn format
```

### 追加パッケージの公式ドキュメント

- [MaterialUI](https://next--material-ui.netlify.app/material-ui)
- [SWR](https://swr.vercel.app)
- [jwt-decode](https://github.com/auth0/jwt-decode)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)
- [eslint-import-resolver-alias](https://github.com/johvin/eslint-import-resolver-alias)
- [Pretteir](https://prettier.io/docs/en/install.html)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [date-fns](https://date-fns.org/)
- [NoSleep.js](https://github.com/richtr/NoSleep.js)
