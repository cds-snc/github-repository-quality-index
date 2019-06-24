# Set up instructions

```
gcloud kms decrypt --project=github-quality-index --plaintext-file=github.pem --ciphertext-file=github.pem.enc --location=global --keyring=deploy --key=github
```

```
gcloud kms decrypt --project=github-quality-index --plaintext-file=.env --ciphertext-file=.env.enc --location=global --keyring=deploy --key=env
```

# Dev

```
yarn tsc-watch
```

in one window and

```
yarn dev
```

in another.
