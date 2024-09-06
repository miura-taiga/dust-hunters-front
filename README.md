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

## パッケージを追加について

yarnを使っているのでyarnでいれるようにしてください

`docker compose build`か、コンテナ内で`yarn install`のどちらかが必要になるので適宜連絡お願いします。

## ESLint

ESLintを利用しています。
PRを上げる前にかならずESLintチェックしてください。

```bash
# ESLint
$ yarn lint
# ESLint + 自動修正
$ yarn lint:fix
```

### 追加パッケージの公式ドキュメント

- [MaterialUI](https://next--material-ui.netlify.app/material-ui)
- [SWR](https://swr.vercel.app)
- [jwt-decode](https://github.com/auth0/jwt-decode)
